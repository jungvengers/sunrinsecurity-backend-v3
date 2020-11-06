import userRouter from 'app/user/routes'
import { Router } from 'express'

const router = Router()

router.use('/user', userRouter)

export default router