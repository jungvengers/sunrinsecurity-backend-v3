import { Schema, model, Document } from "mongoose"

interface NoticeModel {
    writer: string
    title: string
    content: string
    images: string[]
    youtubeURLs: string[]
}

interface NoticeModelDocument extends Document, NoticeModel {}

const noticeSchema: Schema<NoticeModelDocument> = new Schema(
    {
        writer: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        images: { type: [String], default: [] },
        youtubeURLs: { type: [String], default: [] },
    },
    { timestamps: true }
)

noticeSchema.index({ username: 1 })

const Notice = model<NoticeModelDocument>("Noticeboard", noticeSchema)

export { NoticeModel, NoticeModelDocument as NoticeModelSchema, Notice }
