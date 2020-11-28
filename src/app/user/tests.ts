import assert from "assert"
import request from "supertest"
import mongoose from "mongoose"
import app from "app"
import { User } from "app/user/models"
import connectDB from "config/connectDB"
import getErrorMessage from "utils/errors"
import { ErrorType } from "errors"
import env from "config/env"

const username = "testaccount"
const password = "testpassword"

describe("User", async function () {
    before(async function () {
        connectDB()
        await User.deleteMany({}, () => {})
    })

    describe("Registration", function () {
        describe("Success Case", async function () {
            it("Proper Information", async function () {
                await request(app)
                    .post("/user/register")
                    .send({
                        username: username,
                        password: password,
                        alias: "thetestaccount",
                        secret_code: env.REGISTRATION_SECRET,
                    })
                    .expect(201)
            })
        })

        describe("Failure Case", async function () {
            it("No username", async function () {
                const response = await request(app)
                    .post("/user/register")
                    .send({
                        username: "testaccount",
                        alias: "thetestaccount",
                        secret_code: env.REGISTRATION_SECRET,
                    })
                    .expect(400)
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
            })
            it("No password", async function () {
                const response = await request(app)
                    .post("/user/register")
                    .send({
                        password: "testpassword1234",
                        alias: "thetestaccount",
                        secret_code: env.REGISTRATION_SECRET,
                    })
                    .expect(400)
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
            })
            it("User Duplicates", async function () {
                const response = await request(app)
                    .post("/user/register")
                    .send({
                        username: "testaccount",
                        password: "testpassword1234",
                        alias: "thetestaccount",
                        secret_code: env.REGISTRATION_SECRET,
                    })
                    .expect(400)
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.UserExists)
            })
            it("Wrong Secret Code", async function () {
                const response = await request(app)
                    .post("/user/register")
                    .send({
                        username: "testaccount",
                        password: "testpassword1234",
                        alias: "thetestaccount",
                        secret_code: "wrong",
                    })
                    .expect(400)
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.WrongRegistrationKey)
            })
        })
    })

    describe("Authentication", function () {
        describe("Success Case", async function () {
            it("Proper Information", async function () {
                const response = await request(app)
                    .post("/user/auth/token")
                    .send({
                        username: username,
                        password: password,
                    })
                const data = JSON.parse(response.text)
                assert.strictEqual(username, data.user.username)
            })
        })

        describe("Failure Case", async function () {
            it("Wrong Username", async function () {
                const response = await request(app)
                    .post("/user/auth/token")
                    .send({
                        username: "wrongusername",
                        password: "wrongpassword",
                    })
                    .expect(400, getErrorMessage(ErrorType.LoginFailed))
            })
            it("Wrong Password", async function () {
                await request(app)
                    .post("/user/auth/token")
                    .send({
                        username: username,
                        password: "wrongpassword",
                    })
                    .expect(400, getErrorMessage(ErrorType.LoginFailed))
            })
        })
    })

    after(async function () {
        await User.deleteMany({}, () => {})
        await mongoose.disconnect()
    })
})
