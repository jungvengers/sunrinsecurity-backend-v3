import userRouter from "app/user/routes"
import articleRouter from "app/article/routes"
import { Router } from "express"

const router = Router()

router.use("/user", userRouter)
router.use("/article", articleRouter)

export default router
