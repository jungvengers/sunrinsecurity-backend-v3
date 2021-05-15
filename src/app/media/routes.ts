import path from "path"
import { Request, Response, Router, static as expressStatic } from "express"
import passport from "passport"
import { uploadMedia } from "app/media/controllers"
import fileUploader from "config/fileUploader"
import { ErrorType } from "errors"
import getErrorMessage from "utils/errors"
import { s3Upload } from "utils/s3Upload"
import { join } from "path"

const router = Router()

const isProperExtension = (fileExtension: string) => {
    const acceptableExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".zip"]
    return acceptableExtensions.includes(fileExtension)
}

const isFile = (req: Request, _: Response, next: Function) => {
    if (req.file === undefined) {
        next(ErrorType.ValidationError)
        return
    } else {
        const filename = req.file.filename
        const fileExtension = path.extname(filename).toLowerCase()
        if (!isProperExtension(fileExtension)) {
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

const mediaPath = join(__dirname, "../../../media")

const ncpUpload = async (req: Request, res: Response, next: Function) => {
    try {
        if (req.file === undefined) {
            return next()
        }
        await s3Upload(`${mediaPath}/${req.file.filename}`, req.file.filename)
        return next()
    } catch {
        return next()
    }
}

const uploadMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    fileUploader.single("attachment"),
    isFile,
    isFileErrorHandler,
    ncpUpload
]

router.post("/", uploadMiddlewares, uploadMedia)
router.get("/", (req, res) => res.status(404).send())
router.use("/", expressStatic("media"))

export default router
