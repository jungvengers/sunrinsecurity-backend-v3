import { Router, static as expressStatic } from "express"
import passport from "passport"
import { uploadMedia } from "app/media/controllers"
import fileUploader from "config/fileUploader"

const router = Router()

const uploadMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    fileUploader.single("attachment"),
]

router.post("/", uploadMiddlewares, uploadMedia)
router.get("/", (req, res) => res.status(404).send())
router.use("/", expressStatic("media"))

export default router
