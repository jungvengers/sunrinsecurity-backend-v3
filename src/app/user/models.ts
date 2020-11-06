import { Schema, model, Document } from 'mongoose'

export interface UserModel extends Document {
    username: string
    password: string
}

const userSchema: Schema<UserModel> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.index({ username: 1 })

export const User = model<UserModel>("User", userSchema)