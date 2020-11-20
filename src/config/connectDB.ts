import mongoose from "mongoose"
import env from "config/env"

const db = mongoose.connection
const DB_URI =
    process.env.NODE_ENV === "test"
        ? "mongodb://localhost:27017/test"
        : env.DB_URI
db.on("error", (err) => {
    console.log(`Failed to connect to mongoDB server ${DB_URI}`)
    console.log(err)
})
db.once("open", () => {
    console.log(`Connected to mongoDB server ${DB_URI}`)
})

const connectDB = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
}

export default connectDB
