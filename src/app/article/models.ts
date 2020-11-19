import { Schema, model, Document } from "mongoose"

enum club {
    Layer7 = "Layer7",
    Unifox = "Unifox",
    Nefus = "Nefus",
    TeamLog = "TeamLog",
    Emotion = "Emotion",
}

enum kind {
    iot = "iot",
    web = "web",
    app = "app",
    security = "security",
    ai = "ai",
    algorithm = "algorithm",
    network = "network",
}

export interface ArticleModel extends Document {
    category: string
    participator: string[]
    club: club[]
    content: string
    kind: kind[]
}

const articleSchema: Schema<ArticleModel> = new Schema({
    category: { type: String, required: true },
    participator: { type: String },
    club: {
        type: [
            {
                type: String,
                enum: ["Layer7", "Unifox", "Nefus", "TeamLog", "Emotion"],
            },
        ],
    },
    content: { type: String },
    kind: [
        {
            type: String,
            enum: [
                "iot",
                "web",
                "app",
                "security",
                "ai",
                "algorithm",
                "network",
            ],
        },
    ],
})

articleSchema.index({ username: 1 })

export const Article = model<ArticleModel>("User", articleSchema)
