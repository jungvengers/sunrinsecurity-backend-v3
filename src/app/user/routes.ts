import { Router } from "express"
import { body } from "express-validator"
import { register, createToken } from "app/user/controllers"
import { validationResultChecker } from "middlewares"

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

router.post("/register", registerMiddlewares, register)
router.post("/auth/token", authMiddlewares, createToken)

export default router
