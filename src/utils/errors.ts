import { ErrorType, errorMessages } from '../errors'

const getErrorMessage = (errorType: ErrorType) => {
    const response = { "errorType": errorType, "msg": errorMessages[errorType] }
    return response
}


export default getErrorMessage