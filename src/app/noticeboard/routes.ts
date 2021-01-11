import { Router } from "express"
import { body, param } from "express-validator"
import {
    addNotice,
    getNotice,
    updateNotice,
    deleteNotice,
    getNotices,
} from "app/noticeboard/controllers"
import { validationResultChecker } from "middlewares"
import passport from "passport"

const router = Router()

const addNoticeMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    body("title").notEmpty(),
    body("content").notEmpty(),
    validationResultChecker,
]

const updateNoticeMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    validationResultChecker,
]

router.post("/", addNoticeMiddlewares, addNotice)
router.get("/:id", getNotice)
router.patch("/:id", updateNoticeMiddlewares, updateNotice)
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteNotice
)
router.get("/", getNotices)

export default router
