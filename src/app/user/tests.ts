import assert from "assert"
import httpMocks from "node-mocks-http"
import { register, createToken } from "app/user/controllers"
import { User } from "app/user/models"

describe("User", () => {
    before((done) => {
        require("config/connectDB")
        User.deleteMany({}, done)
    })

    describe("Registration", function () {
        it("Success Case 1", async function () {
            const req = httpMocks.createRequest({
                method: "POST",
                url: "/user/register",
                body: {
                    username: "testaccount",
                    password: "testpassword1234",
                },
            })
            const res = httpMocks.createResponse()
            await register(req, res)
        })
        it("Failure case 1", async () => {
            const req = httpMocks.createRequest({
                method: "POST",
                url: "/user/register",
                body: {
                    username: "testaccount",
                    password: "testpassword1234",
                },
            })
            const res = httpMocks.createResponse()

            await register(req, res)
            const statusCode = res._getStatusCode()
            assert.strictEqual(statusCode, 400)
        })
    })
})
