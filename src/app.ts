import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import passport from "passport"
import passportConfig from "config/passport"
import routes from "routes"

passportConfig()

const app = express()
app.use(bodyParser.json())
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"))
}
app.use(passport.initialize())
app.use("", routes)

export default app
