import { Router } from "express"
import { body, param } from "express-validator"
import {
    addArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    getArticles,
} from "app/article/controllers"
import { validationResultChecker } from "middlewares"
import passport from "passport"

const router = Router()

const addArticleMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    body("isContestWork").notEmpty(),
    body("isContestWork").isBoolean(),
    body("participants").notEmpty(),
    body("participants").isArray(),
    body("content").notEmpty(),
    body("kinds").notEmpty(),
    body("kinds").isArray(),
    validationResultChecker,
]

const updateArticleMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    validationResultChecker,
]

router.post("/", addArticleMiddlewares, addArticle)
router.get("/:id", getArticle)
router.patch("/:id", updateArticleMiddlewares, updateArticle)
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteArticle
)
router.get("/", getArticles)

export default router
