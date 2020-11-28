import userRouter from "app/user/routes"
import articleRouter from "app/article/routes"
import mediaRouter from "app/media/routes"
import { Router } from "express"

const router = Router()

router.use("/user", userRouter)
router.use("/article", articleRouter)
router.use("/media", mediaRouter)

export default router
