import assert from "assert"
import request from "supertest"
import mongoose from "mongoose"
import app from "app"
import { Notice } from "app/noticeboard/models"
import { User } from "app/user/models"
import { createHashedPassword } from "utils/user"
import connectDB from "config/connectDB"
import { ErrorType } from "errors"

const testData = [
    {
        title: "김연규가 쓴 글 입니다",
        content: "히히 안녕하세요.",
    },
    {
        title: "조강연이 쓴 글입니다",
        content: "저는 감자입니다. 제가 목욕하러 탕에 들어가면 그건 감자탕.",
    },
]

const createNotice = async function (body: object, token: string) {
    return await request(app)
        .post("/noticeboard")
        .set("Authorization", "Bearer " + token)
        .send(body)
}

describe("Noticeboard", () => {
    const username = "testaccount"
    const password = "testpassword"
    const title = "testtitle"
    const content = "testcontent"
    let token = ""
    let token2 = ""

    before(async function () {
        connectDB()

        await User.deleteMany({}, () => {})
        await Notice.deleteMany({}, () => {})

        const hashedPassword = createHashedPassword(password)
        await User.create({
            username: username,
            password: hashedPassword,
            alias: "for testing purposes",
        })
        await User.create({
            username: username + "2",
            password: hashedPassword,
            alias: "for testing purposes 2",
        })

        const response = await request(app).post("/user/auth/token").send({
            username: username,
            password: password,
        })
        token = JSON.parse(response.text).token

        const response2 = await request(app)
            .post("/user/auth/token")
            .send({
                username: username + "2",
                password: password,
            })
        token2 = JSON.parse(response2.text).token
    })

    beforeEach(async function () {
        await Notice.deleteMany({}, () => {})
    })

    describe("Add Notice", function () {
        describe("Failure Cases", function () {
            it("Should return 401 unauthorized", async function () {
                await request(app)
                    .post("/noticeboard")
                    .send({
                        title: title,
                        content: content,
                    })
                    .expect(401)
            })
            it("No title, should return 400 with error response", async function () {
                const response = await request(app)
                    .post("/noticeboard")
                    .set("Authorization", "Bearer " + token)
                    .send({
                        content: content,
                    })
                    .expect(400)
                const { errorType, details } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
                assert.strictEqual(details[0].param, "title")
            })
            it("No content, should return 400 with error response", async function () {
                const response = await request(app)
                    .post("/noticeboard")
                    .set("Authorization", "Bearer " + token)
                    .send({
                        title: title,
                    })
                    .expect(400)
                const { errorType, details } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
                assert.strictEqual(details[0].param, "content")
            })
        })
        describe("Success Cases", function () {
            it("Proper Request", async function () {
                await request(app)
                    .post("/noticeboard")
                    .set("Authorization", "Bearer " + token)
                    .send({
                        title: title,
                        content: content,
                    })
                    .expect(201)
            })
        })
    })
    describe("Get Notice", async function () {
        it("Notice should not be found", async function () {
            await request(app).get("/noticeboard/wrong_id").send().expect(404)
        })
        it("Notice should be found", async function () {
            const id = JSON.parse((await createNotice(testData[0], token)).text)
                ._id
            const response = await request(app)
                .get(`/noticeboard/${id}`)
                .send()
                .expect(200)
            const parsedResponse = JSON.parse(response.text)
            const responseTitle = parsedResponse.title
            const responseContent = parsedResponse.content
            assert.strictEqual(responseTitle, testData[0].title)
            assert.strictEqual(responseContent, testData[0].content)
        })
    })
    describe("Update Notice", async function () {
        describe("Failure Cases", function () {
            it("Notice should not be found", async function () {
                await request(app)
                    .patch("/noticeboard/wrong_id")
                    .set("Authorization", "Bearer " + token)
                    .send()
                    .expect(404)
            })
            it("Should return 401 Unauthorized", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                await request(app).patch(`/noticeboard/${id}`).expect(401)
            })
            it("Should return 403 Forbidden", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                await request(app)
                    .patch(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token2)
                    .expect(403)
            })
        })
        describe("Success Cases", function () {
            it("Updating title", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        title: "수정된 게시글입니다.",
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.strictEqual(data.title, "수정된 게시글입니다.")
            })
            it("Updating content", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        content: "<p>수정된 내용입니다.</p>",
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.strictEqual(data.content, "<p>수정된 내용입니다.</p>")
            })
        })
    })
    describe("Delete Notice", async function () {
        describe("Failure Cases", function () {
            it("Notice should not be found", async function () {
                await request(app)
                    .delete("/noticeboard/wrong_id")
                    .set("Authorization", "Bearer " + token)
                    .send()
                    .expect(404)
            })
            it("Should return 401 Unauthorized", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                await request(app).delete(`/noticeboard/${id}`).expect(401)
            })
            it("Should return 403 Forbidden", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                await request(app)
                    .delete(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token2)
                    .expect(403)
            })
        })
        describe("Success Cases", function () {
            it("Notice Found, Should delete an Notice", async function () {
                const id = JSON.parse(
                    (await createNotice(testData[0], token)).text
                )._id
                await request(app)
                    .delete(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .expect(200)
                await request(app)
                    .get(`/noticeboard/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .expect(404)
            })
        })
    })

    after(async () => {
        await Notice.deleteMany({}, () => {})
        await User.deleteMany({}, () => {})
        await mongoose.disconnect()
    })
})
