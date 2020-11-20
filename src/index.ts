import dotenv from "dotenv"
dotenv.config()

import express from "express"
import swaggerUI from "swagger-ui-express"
import { ErrorType, errorMessages } from "errors"
import connectDB from "config/connectDB"
connectDB()

import app from "app"

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.get("/custom-errors", (req: express.Request, res: express.Response) => {
    res.json({
        errorTypes: ErrorType,
        errorMessages: errorMessages,
    })
})

app.listen(process.env.PORT || 3000)
