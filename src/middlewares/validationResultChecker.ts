import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ErrorType } from '../errors'
import getErrorMessage from '../utils/errors'

const validationResultChecker = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req)
    const errorMessage = getErrorMessage(ErrorType.ValidationError)
    const response = {
        errorType: errorMessage.errorType,
        msg: errorMessage.msg,
        details: errors.array()
    }
    if (!errors.isEmpty()) {
        return res.status(400).json(
            response
        ).end()
    }
    next()
}

export default validationResultChecker