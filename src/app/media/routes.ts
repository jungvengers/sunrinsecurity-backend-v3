import path from "path"
import { Request, Response, Router, static as expressStatic } from "express"
import passport from "passport"
import { uploadMedia } from "app/media/controllers"
import fileUploader from "config/fileUploader"
import { ErrorType } from "errors"
import getErrorMessage from "utils/errors"

const router = Router()

const isImage = (fileExtension: string) => {
    switch (fileExtension) {
        case ".jpg":
            return true
        case ".jpeg":
            return true
        case ".png":
            return true
        default:
            return false
    }
}

const isFile = (req: Request, _: Response, next: Function) => {
    if (req.file === undefined) {
        next(ErrorType.ValidationError)
        return
    } else {
        const filename = req.file.filename
        const fileExtension = path.extname(filename).toLowerCase()
        if (!isImage(fileExtension)) {
            next(ErrorType.ValidationError)
            return
        }
    }
    next()
}

const isFileErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    _: Function
) => {
    if (err === ErrorType.ValidationError) {
        const errorMessage = getErrorMessage(ErrorType.ValidationError)
        const response = {
            errorType: errorMessage.errorType,
            msg: errorMessage.msg,
            details: [
                {
                    value: req.body.attachment,
                    msg: "Invalid value",
                    param: "attachment",
                    location: "body",
                },
            ],
        }
        res.status(400).send(response)
    }
}

const uploadMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    fileUploader.single("attachment"),
    isFile,
    isFileErrorHandler,
]

router.post("/", uploadMiddlewares, uploadMedia)
router.get("/", (req, res) => res.status(404).send())
router.use("/", expressStatic("media"))

export default router
