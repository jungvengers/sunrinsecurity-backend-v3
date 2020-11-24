import { Schema, model, Document } from "mongoose"

enum Club {
    Layer7 = "Layer7",
    Unifox = "Unifox",
    Nefus = "Nefus",
    TeamLog = "TeamLog",
    Emotion = "Emotion",
}

enum Kind {
    iot = "iot",
    web = "web",
    app = "app",
    security = "security",
    ai = "ai",
    algorithm = "algorithm",
    network = "network",
}

export interface ArticleModel extends Document {
    writer: string
    isContestWork: boolean
    participators: string[]
    clubs: Club[]
    content: string
    kinds: Kind[]
}

const articleSchema: Schema<ArticleModel> = new Schema(
    {
        writer: { type: String, required: true },
        isContestWork: { type: Boolean, required: true },
        participators: { type: [String], required: true },
        clubs: { type: [String], enum: Object.keys(Club) },
        content: { type: String, required: true },
        kinds: { type: [String], enum: Object.keys(Kind), required: true },
    },
    { timestamps: { createdAt: "created_at" } }
)

articleSchema.index({ username: 1 })

export const Article = model<ArticleModel>("Article", articleSchema)
