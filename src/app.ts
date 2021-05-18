import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import passport from "passport"
import passportConfig from "config/passport"
import routes from "routes"

passportConfig()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"))
}
app.use(passport.initialize())
app.use("", routes)
app.use((err: any, req: any, res: any, next: any) => {
    if (err) {
        console.log(err)
    }
})

export default app
