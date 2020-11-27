import { Schema, model, Document } from "mongoose"

interface UserModel extends Document {
    username: string
    password: string
    alias: string
}

interface UserModelDocument extends Document, UserModel {}

const userSchema: Schema<UserModel> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    alias: { type: String },
})

userSchema.index({ username: 1 })

const User = model<UserModel>("User", userSchema)

export { UserModel, UserModelDocument, User }
