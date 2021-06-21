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

interface ArticleModel {
    writer: string
    isContestWork: boolean
    participants: string[]
    clubs: Club[]
    title: string
    content: string
    kinds: Kind[]
    images: string[]
    youtubeURLs: string[]
}

interface ArticleModelDocument extends Document, ArticleModel { }

const articleSchema: Schema<ArticleModelDocument> = new Schema(
    {
        writer: { type: String, required: true },
        isContestWork: { type: Boolean, required: true },
        participants: { type: [String], required: true },
        clubs: { type: [String], enum: Object.keys(Club), default: [] },
        title: { type: String, required: true },
        content: { type: String, required: true },
        kinds: {
            type: [String],
            enum: Object.keys(Kind),
            required: true,
            default: [],
        },
        images: { type: [String], default: [] },
        thumbnail: { type: String, default: "" },
        youtubeURLs: { type: [String], default: [] },
    },
    { timestamps: true }
)

articleSchema.index({ username: 1 })

const Article = model<ArticleModelDocument>("Article", articleSchema)

export {
    Club,
    Kind,
    ArticleModel,
    ArticleModelDocument as ArticleModelSchema,
    Article,
}
