import express, { Router } from "express"
import { body } from "express-validator"
import { register, createToken } from "app/user/controllers"
import { validationResultChecker } from "middlewares"
import passport from "passport"

const router = Router()

const registerMiddlewares = [
    body("username").notEmpty(),
    body("password").notEmpty(),
    body("alias").notEmpty(),
    body("secret_code").notEmpty(),
    validationResultChecker,
]

const authMiddlewares = [
    body("username").notEmpty(),
    body("password").notEmpty(),
    validationResultChecker,
]

const tokenValidatorMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    validationResultChecker,
]

router.post("/register", registerMiddlewares, register)
router.get(
    "/auth/validate",
    tokenValidatorMiddlewares,
    (_: express.Request, res: express.Response) => {
        res.end()
    }
)
router.post("/auth/token", authMiddlewares, createToken)

export default router
