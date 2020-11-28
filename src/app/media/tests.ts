import fs from "fs"
import path from "path"
import assert from "assert"
import request from "supertest"
import mongoose from "mongoose"
import app from "app"
import { User } from "app/user/models"
import connectDB from "config/connectDB"
import getErrorMessage from "utils/errors"
import { ErrorType } from "errors"
import env from "config/env"
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
        })
        describe("Success cases", function () {
            it("Proper Request", async function () {
                await request(app)
                    .post("/media")
                    .set("Authorization", "Bearer " + token)
                    .attach("attachment", "tests/media/IMG_1057.jpeg")
                    .expect(200)
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

    after(async function () {
        const directory = "media"

        fs.readdir(directory, (_err, files) => {
            files.forEach((file) => {
                fs.unlink(path.join(directory, file), () => {})
            })
        })
    })
})
