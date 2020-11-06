import { Router } from 'express'
import { body } from 'express-validator'
import { register, createToken } from 'app/user/controllers'
import { validationResultChecker } from 'middlewares'

const router = Router()

const registerValidator = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validationResultChecker
]

const authValidator = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validationResultChecker
]

router.post('/register', registerValidator, register)
router.post('/auth/token', authValidator, createToken)

export default router