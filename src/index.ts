import app from "app"

import express from "express"
import { ErrorType, errorMessages } from "errors"
import connectDB from "config/connectDB"
connectDB()

app.get("/custom-errors", (req: express.Request, res: express.Response) => {
    res.json({
        errorTypes: ErrorType,
        errorMessages: errorMessages,
    })
})

app.listen(process.env.PORT || 3000)
