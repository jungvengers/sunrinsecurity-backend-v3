import { Request, Response } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { ErrorType } from "errors"
import { User } from "./models"
import env from "config/env"
import getErrorMessage from "utils/errors"
import { createHashedPassword } from "utils/user"

const register = async (req: Request, res: Response) => {
    const { username, password, alias, secret_code } = req.body
    const hashedPassword = createHashedPassword(password)
    const isExistingUser = await User.exists({ username: username })

    if (env.REGISTRATION_SECRET !== secret_code) {
        return res
            .status(400)
            .json(getErrorMessage(ErrorType.WrongRegistrationKey))
            .send()
    }

    if (isExistingUser) {
        return res
            .status(400)
            .json(getErrorMessage(ErrorType.UserExists))
            .send()
    }

    await User.create({
        username: username,
        password: hashedPassword,
        alias: alias,
    })

    res.status(201).send()
}

const createToken = (req: Request, res: Response) => {
    const authCallback = (err: any, user: string | object) => {
        if (err || !user) {
            const errorMessage = getErrorMessage(ErrorType.LoginFailed)
            const response = {
                errorType: errorMessage.errorType,
                msg: errorMessage.msg,
            }
            return res.status(400).json(response).send()
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                const errorMessage = getErrorMessage(ErrorType.LoginFailed)
                const response = {
                    errorType: errorMessage.errorType,
                    msg: errorMessage.msg,
                    details: err,
                }
                return res.status(400).json(response).send()
            }
            const token = jwt.sign(user, env.JWT_SECRET)
            return res.json({ user, token }).send()
        })
    }
    const auth = passport.authenticate(
        "local",
        { session: false },
        authCallback
    )
    auth(req, res)
}

export { register, createToken }
