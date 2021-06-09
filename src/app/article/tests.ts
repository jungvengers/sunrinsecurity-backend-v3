import assert from "assert"
import request from "supertest"
import mongoose from "mongoose"
import app from "app"
import { Article } from "app/article/models"
import { User } from "app/user/models"
import { createHashedPassword } from "utils/user"
import connectDB from "config/connectDB"
import { ErrorType } from "errors"

const testData = [
    {
        isContestWork: true,
        participants: ["김x연", "김x규"],
        clubs: ["Layer7"],
        content: "<p>대회 실적 true, 동아리 Layer7, 종류 iot</p>",
        kinds: ["iot"],
    },
    {
        isContestWork: false,
        participants: ["양x준"],
        clubs: ["TeamLog"],
        content: "<p>대회 실적 false, 동아리 TeamLog, 종류 web, network</p>",
        kinds: ["web", "network"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 web</p>",
        kinds: ["web"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "양x준"],
        clubs: ["Layer7", "TeamLog"],
        content:
            "<p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 app, web</p>",
        kinds: ["app", "web"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 1</p><p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 web</p>",
        kinds: ["web"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 2</p><p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 web</p>",
        kinds: ["web"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 3</p><p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 web</p>",
        kinds: ["web"],
    },
    {
        isContestWork: true,
        participants: ["김x규", "조x연", "양x준", "지x보"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 4</p><p>대회 실적 true, 동아리 Layer7, Unifox, TeamLog 종류 web, app, security</p>",
        kinds: ["web", "app", "security"],
    },
    {
        isContestWork: true,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 5</p><p>대회 실적 true, 동아리 Layer7, Unifox, TeamLog 종류 web, app</p>",
        kinds: ["web", "app"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "조x연", "양x준"],
        clubs: ["Layer7", "Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 6</p><p>대회 실적 false, 동아리 Layer7, Unifox, TeamLog 종류 web</p>",
        kinds: ["web"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "김x태", "양x준"],
        clubs: ["Layer7", "TeamLog"],
        content:
            "<p>Lorem Ipsum 7</p><p>대회 실적 false, 동아리 Layer7, TeamLog 종류 web, ai, security</p>",
        kinds: ["web", "ai", "security"],
    },
    {
        isContestWork: false,
        participants: ["김x규", "지x보", "양x준"],
        clubs: ["Layer7", "TeamLog"],
        content:
            "<p>Lorem Ipsum 8</p><p>대회 실적 false, 동아리 Layer7, TeamLog 종류 web, app</p>",
        kinds: ["web", "app"],
    },
    {
        isContestWork: false,
        participants: ["조x연", "양x준"],
        clubs: ["Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 9</p><p>대회 실적 false, 동아리 Unifox, TeamLog 종류 network, web</p>",
        kinds: ["network", "web"],
    },
    {
        isContestWork: false,
        participants: ["조x연", "양x준"],
        clubs: ["Unifox", "TeamLog"],
        content:
            "<p>Lorem Ipsum 10</p><p>대회 실적 false, 동아리 Unifox, TeamLog 종류 app</p>",
        kinds: ["app"],
    },
]

const createArticle = async function (body: object, token: string) {
    return await request(app)
        .post("/article")
        .set("Authorization", "Bearer " + token)
        .send(body)
}

describe("Article", () => {
    const username = "testaccount"
    const password = "testpassword"
    const participants = ["김x규", "양x준", "조x연"]
    const clubs = ["Layer7", "Unifox", "TeamLog"]
    const content = "<p>WE CREATED THIS SITE!</p>"
    const kinds = ["web"]
    let token = ""
    let token2 = ""

    before(async function () {
        connectDB()

        await User.deleteMany({}, () => { })
        await Article.deleteMany({}, () => { })

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
        await Article.deleteMany({}, () => { })
    })

    describe("Add Article", function () {
        describe("Failure Cases", function () {
            it("Should return 401 unauthorized", async function () {
                await request(app)
                    .post("/article")
                    .send({
                        isContestWork: false,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                    })
                    .expect(401)
            })
            describe("Parameter participants", function () {
                it("No participants, should return 400 with error response", async function () {
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send({
                            isContestWork: false,
                            clubs: clubs,
                            content: content,
                            kinds: kinds,
                        })
                        .expect(400)
                    const { errorType, details } = JSON.parse(response.text)
                    assert.strictEqual(errorType, ErrorType.ValidationError)
                    assert.strictEqual(details[0].param, "participants")
                })
                it("Empty participants, should return 400 with error response", async function () {
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send({
                            isContestWork: false,
                            participants: [],
                            clubs: clubs,
                            content: content,
                            kinds: kinds,
                        })
                        .expect(400)
                    const { errorType, details } = JSON.parse(response.text)
                    assert.strictEqual(errorType, ErrorType.ValidationError)
                    assert.strictEqual(details[0].param, "participants")
                })
            })
            describe("Parameter content", function () {
                it("No Content, should return 400 with error response", async function () {
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send({
                            isContestWork: false,
                            participants: participants,
                            clubs: clubs,
                            kinds: kinds,
                        })
                        .expect(400)
                    const { errorType, details } = JSON.parse(response.text)
                    assert.strictEqual(errorType, ErrorType.ValidationError)
                    assert.strictEqual(details[0].param, "content")
                })
            })
            describe("Parameter kinds", function () {
                it("No kinds, should return 400 with error response", async function () {
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send({
                            isContestWork: false,
                            participants: participants,
                            clubs: clubs,
                            content: content,
                        })
                        .expect(400)
                    const { errorType, details } = JSON.parse(response.text)
                    assert.strictEqual(errorType, ErrorType.ValidationError)
                    assert.strictEqual(details[0].param, "kinds")
                })
                it("Empty kinds, should return 400 with error response", async function () {
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send({
                            isContestWork: false,
                            participants: participants,
                            clubs: clubs,
                            content: content,
                            kinds: [],
                        })
                        .expect(400)
                    const { errorType, details } = JSON.parse(response.text)
                    assert.strictEqual(errorType, ErrorType.ValidationError)
                    assert.strictEqual(details[0].param, "kinds")
                })
            })
        })
        describe("Success Cases", function () {
            describe("isContestWork", function () {
                it("With clubs", async function () {
                    const body = {
                        isContestWork: true,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
                it("Without clubs", async function () {
                    const body = {
                        isContestWork: true,
                        participants: participants,
                        content: content,
                        kinds: kinds,
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
                it("With images", async function () {
                    const body = {
                        isContestWork: true,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                        images: ["image"],
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
                it("With images & thumbnail", async function () {
                    const body = {
                        isContestWork: true,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                        images: ["image"],
                        thumbnail: "image"
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
                it("With youtubeURLs", async function () {
                    const body = {
                        isContestWork: true,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                        youtubeURLs: [
                            "https://www.youtube.com/watch?v=lOrU0MH0bMk",
                            "https://www.youtube.com/watch?v=486cFz09diA",
                        ],
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
            })
            describe("not isContestWork", function () {
                it("With clubs", async function () {
                    const body = {
                        isContestWork: false,
                        participants: participants,
                        clubs: clubs,
                        content: content,
                        kinds: kinds,
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                })
                it("Without clubs", async function () {
                    const body = {
                        isContestWork: false,
                        participants: participants,
                        content: content,
                        kinds: kinds,
                    }
                    const response = await request(app)
                        .post("/article")
                        .set("Authorization", "Bearer " + token)
                        .send(body)
                        .expect(201)
                    const data = JSON.parse(response.text)
                    assert.strictEqual("_id" in data, true)
                }),
                    it("With images", async function () {
                        const body = {
                            isContestWork: false,
                            participants: participants,
                            content: content,
                            kinds: kinds,
                            images: ["image"],
                        }
                        const response = await request(app)
                            .post("/article")
                            .set("Authorization", "Bearer " + token)
                            .send(body)
                            .expect(201)
                        const data = JSON.parse(response.text)
                        assert.strictEqual("_id" in data, true)
                    })
            })
        })
    })
    describe("Get Article", async function () {
        it("Article should not be found", async function () {
            await request(app).get("/article/wrong_id").send().expect(404)
        })
        it("Article should be found", async function () {
            const id = JSON.parse(
                (await createArticle(testData[0], token)).text
            )._id
            const response = await request(app)
                .get(`/article/${id}`)
                .send()
                .expect(200)
            const responseContent = JSON.parse(response.text).content
            assert.strictEqual(responseContent, testData[0].content)
        })
    })
    describe("Update Article", async function () {
        describe("Failure Cases", function () {
            it("Article should not be found", async function () {
                await request(app)
                    .patch("/article/wrong_id")
                    .set("Authorization", "Bearer " + token)
                    .send()
                    .expect(404)
            })
            it("Should return 401 Unauthorized", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                await request(app).patch(`/article/${id}`).expect(401)
            })
            it("Should return 403 Forbidden", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token2)
                    .expect(403)
            })
        })
        describe("Success Cases", function () {
            it("Updating isContestWork", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        isContestWork: false,
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.strictEqual(data.isContestWork, false)
            })
            it("Updating participants", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const participants = ["김x규1", "김x규2"]
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        participants: participants,
                    })
                    .expect(200)
                const data = JSON.parse(response.text)

                assert.deepStrictEqual(data.participants, ["김x규1", "김x규2"])
            })
            it("Updating content", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        content: "<p>그냥 테스트 수정입니다.</p>",
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.strictEqual(
                    data.content,
                    "<p>그냥 테스트 수정입니다.</p>"
                )
            })
            it("Update kinds", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        kinds: ["network", "security"],
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.deepStrictEqual(data.kinds, ["network", "security"])
            })
            it("Update thumbnail", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        thumbnail: "testtest"
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                console.log(data)
                assert.deepStrictEqual(data.thumbnail, "testtest")
            })
            it("Update images", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                const response = await request(app)
                    .patch(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .send({
                        images: ["testtest"]
                    })
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.deepStrictEqual(data.images, ["testtest"])
            })
        })
    })
    describe("Delete Article", async function () {
        describe("Failure Cases", function () {
            it("Article should not be found", async function () {
                await request(app)
                    .delete("/article/wrong_id")
                    .set("Authorization", "Bearer " + token)
                    .send()
                    .expect(404)
            })
            it("Should return 401 Unauthorized", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                await request(app).delete(`/article/${id}`).expect(401)
            })
            it("Should return 403 Forbidden", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                await request(app)
                    .delete(`/article/${id}`)
                    .set("Authorization", "Bearer " + token2)
                    .expect(403)
            })
        })
        describe("Success Cases", function () {
            it("Article Found, Should delete an article", async function () {
                const id = JSON.parse(
                    (await createArticle(testData[0], token)).text
                )._id
                await request(app)
                    .delete(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .expect(200)
                await request(app)
                    .get(`/article/${id}`)
                    .set("Authorization", "Bearer " + token)
                    .expect(404)
            })
        })
    })

    describe("Get Articles", function () {
        beforeEach(async function () {
            for (let i = 0; i < testData.length; i++)
                await createArticle(testData[i], token)
        })

        // parameter based filtering feature should be tested
        describe("Filter", function () {
            describe("isContestWork", function () {
                it(`Number of isContestWork articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get("/article?isContestWork=true")
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.isContestWork) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of isNotContestWork articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get("/article?isContestWork=false")
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (!data.isContestWork) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
            })
            describe("club", function () {
                it(`Number of layer7Club articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?clubs=["Layer7"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.clubs.includes("Layer7")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of unifoxClub articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?clubs=["Unifox"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.clubs.includes("Unifox")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of nefusClub articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?clubs=["Nefus"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.clubs.includes("Nefus")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of teamlogClub articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?clubs=["TeamLog"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.clubs.includes("TeamLog")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
            })
            describe("kind", function () {
                it(`Number of webKind articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?kinds=["web"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.kinds.includes("web")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of iotKind articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?kinds=["iot"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.kinds.includes("iot")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of appKind articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?kinds=["app"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.kinds.includes("app")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of securityKind articles should be the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?kinds=["security"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.kinds.includes("security")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
                it(`Number of networkKind articles should be $the same as test data`, async function () {
                    let contentsCnt = 0
                    const response = await request(app)
                        .get('/article?kinds=["network"]')
                        .send()
                        .expect(200)
                    const data = JSON.parse(response.text)

                    testData.forEach(function (data) {
                        if (data.kinds.includes("network")) {
                            contentsCnt++
                        }
                    })
                    assert.strictEqual(data.articles.length, contentsCnt)
                })
            })
        })
        describe("Paginate", function () {
            it("Should return 4 articles since per_page is 4.", async function () {
                const response = await request(app)
                    .get("/article")
                    .query({ per_page: 4 })
                    .send()
                    .expect(200)
                const data = JSON.parse(response.text)
                assert.strictEqual(data.articles.length, 4)
            })
            it("Should return proper articles with given parameters, which are page = 1, per_page = 4", async function () {
                const articles = testData.slice(testData.length - 4).reverse()

                const response = await request(app)
                    .get("/article")
                    .query({ page: 1, per_page: 4 })
                    .send()
                    .expect(200)
                const data = JSON.parse(response.text)

                for (let i = 0; i < data.articles.length; i++) {
                    delete data.articles[i]["__v"]
                    delete data.articles[i]["_id"]
                    delete data.articles[i]["createdAt"]
                    delete data.articles[i]["updatedAt"]
                    delete data.articles[i]["writer"]
                    delete data.articles[i]["images"]
                    delete data.articles[i]["youtubeURLs"]
                    delete data.articles[i]["thumbnail"]
                }

                assert.deepStrictEqual(data.articles, articles)
            })
        })
        // pagination
    })

    after(async () => {
        await Article.deleteMany({}, () => { })
        await User.deleteMany({}, () => { })
        await mongoose.disconnect()
    })
})
