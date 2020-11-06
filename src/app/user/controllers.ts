import { Request, Response } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { ErrorType } from "errors"
import { User } from "./models"
import getErrorMessage from "utils/errors"
import { createHashedPassword } from "utils/user"


const register = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const hashedPassword = await createHashedPassword(password)

    const isExistingUser = await User.exists({ 'username': username })

    if (isExistingUser) {
        return res.status(400).json(getErrorMessage(ErrorType.UserExists)).send()
    }

    await User.create({
        username: username,
        password: hashedPassword
    })

    res.status(201).send()
}

const createToken = (req: Request, res: Response) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            const errorMessage = getErrorMessage(ErrorType.LoginFailed)
            const response = {
                errorType: errorMessage.errorType,
                msg: errorMessage.msg
            }
            return res.status(400).json(response).send()
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                const errorMessage = getErrorMessage(ErrorType.LoginFailed)
                const response = {
                    errorType: errorMessage.errorType,
                    msg: errorMessage.msg,
                    details: err
                }
                return res.status(400).json(response).send()
            }
            const token = jwt.sign(user, process.env.JWT_SECRET || 'default')
            return res.json({ user, token }).send()
        })
    })(req, res);
}

export { register, createToken }