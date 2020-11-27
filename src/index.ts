import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { ErrorType, errorMessages } from "errors"
import connectDB from "config/connectDB"
connectDB()

import app from "app"

app.get("/custom-errors", (req: express.Request, res: express.Response) => {
    res.json({
        errorTypes: ErrorType,
        errorMessages: errorMessages,
    })
})

app.listen(process.env.PORT || 3000)
