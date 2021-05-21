import fs from "fs"
import { join } from "path"
import request from "supertest"
import app from "app"
import { User } from "app/user/models"
import connectDB from "config/connectDB"
import { createHashedPassword } from "utils/user"
import axios from "axios"
import assert from "assert"

const username = "testaccount"
const password = "testpassword"

describe("Media", function () {
    let token = ""
    const fileList: string[] = []
    before(async function () {
        connectDB()

        await User.deleteMany({}, () => { })

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
    after(function () {
        for (const file of fileList) {
            const path = join(__dirname, "..", "..", "..", "media", file)
            fs.unlink(path, (err) => err ? console.log(err) : null)
        }
    })
    describe("Upload Image", function () {
        describe("Failure cases", function () {
            it("Unauthroized", async function () {
                await request(app)
                    .post("/media")
                    .attach("attachment", "tests/media/IMG_1057.jpeg")
                    .expect(401)
            }).timeout(10000)
            it("Empty Attachment", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .expect(400)
            }).timeout(10000)
            it("Not file", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .send({
                        attachment: "nothing",
                    })
                    .expect(400)
            }).timeout(10000)
            it("Not a proper extension", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/empty.nothing")
                    .expect(400)
            })
        }).timeout(50000)
        describe("Success cases", function () {
            it("Upload an image", async function () {
                const response = await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/IMG_1057.jpeg")
                    .expect(201)

                fileList.push(JSON.parse(response.text).filename)
            }).timeout(10000)
            it("Upload an zip file", async function () {
                const response = await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/empty.zip")
                    .expect(201)

                fileList.push(JSON.parse(response.text).filename)
            }).timeout(10000)
        }).timeout(50000)
    }).timeout(100000)
    describe("Download Image", function () {
        let filename = ""
        before("Upload image", async function () {
            this.timeout(10000)
            const response = await request(app)
                .post("/media")
                .set("Authorization", "Bearer " + token)
                .attach("attachment", "tests/media/IMG_1057.jpeg")
            filename = JSON.parse(response.text).filename
            fileList.push(filename)
        })
        describe("Failure cases", function () {
            it("Should return 404 for no filename", async function () {
                await request(app).get("/media").send().expect(404)
            }).timeout(10000)
            it("Should return 404 for media not found", async function () {
                await request(app).get("/media/notfilename").send().expect(404)
            }).timeout(10000)
        })
        describe("Success Cases", function () {
            it("Should return 200 OK", async function () {
                await request(app)
                    .get("/media/" + filename)
                    .send()
                    .expect(200)
            }).timeout(10000)
        })
    }).timeout(50000)
    describe("Get S3 File", function () {
        describe("Failure cases", function () {
            it("Should return 403 for Access Forbidden", async function () {
                const response = await axios.get(
                    "https://kr.object.ncloudstorage.com/sunrin-test/test.png"
                ).catch(err => err)
                assert.strictEqual(response.response.status, 403)
            }).timeout(10000)
        })
        describe("Success Cases", function () {
            it("Should return 200 OK", async function () {
                for (const file of fileList) {
                    const response = await axios.get(
                        `https://kr.object.ncloudstorage.com/sunrin-test/${file}`
                    )
                    assert.strictEqual(response.status, 200)
                }
            }).timeout(10000)
        }).timeout(50000)
    })
})