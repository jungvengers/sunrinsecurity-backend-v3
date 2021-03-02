import fs from "fs"
import path from "path"
import request from "supertest"
import app from "app"
import { User } from "app/user/models"
import connectDB from "config/connectDB"
import { createHashedPassword } from "utils/user"

const username = "testaccount"
const password = "testpassword"

describe("Media", function () {
    let token = ""
    before(async function () {
        connectDB()

        await User.deleteMany({}, () => {})

        const hashedPassword = createHashedPassword(password)
        await User.create({
            username: username,
            password: hashedPassword,
            alias: "for testing purposes",
        })

        const response = await request(app).post("/user/auth/token").send({
            username: username,
            password: password,
        })
        token = JSON.parse(response.text).token
    })
    describe("Upload Image", function () {
        describe("Failure cases", function () {
            it("Unauthroized", async function () {
                await request(app)
                    .post("/media")
                    .attach("attachment", "tests/media/IMG_1057.jpeg")
                    .expect(401)
            })
            it("Empty Attachment", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .expect(400)
            })
            it("Not file", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .send({
                        attachment: "nothing",
                    })
                    .expect(400)
            })
            it("Not a proper extension", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/empty.nothing")
                    .expect(400)
            })
        })
        describe("Success cases", function () {
            it("Upload an image", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/IMG_1057.jpeg")
                    .expect(201)
            })
            it("Upload an zip file", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/empty.zip")
                    .expect(201)
            })
        })
    })
    describe("Download Image", function () {
        let filename = ""
        before("Upload image", async function () {
            const response = await request(app)
                .post("/media")
                .set("Authorization", "Bearer " + token)
                .attach("attachment", "tests/media/IMG_1057.jpeg")
            filename = JSON.parse(response.text).filename
        })
        describe("Failure cases", function () {
            it("Should return 404 for no filename", async function () {
                await request(app).get("/media").send().expect(404)
            })
            it("Should return 404 for media not found", async function () {
                await request(app).get("/media/notfilename").send().expect(404)
            })
        })
        describe("Success Cases", function () {
            it("Should return 200 OK", async function () {
                await request(app)
                    .get("/media/" + filename)
                    .send()
                    .expect(200)
            })
        })
    })
})
