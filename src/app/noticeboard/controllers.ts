import { Request, Response } from "express"
import { Notice } from "app/noticeboard/models"
import { UserModel } from "app/user/models"
import { isValidObjectId } from "mongoose"

const addNotice = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user
    const { title, content, images, youtubeURLs, thumbnail } = req.body
    const imageNames: string[] = []
    const youtubeURLList: string[] = []

    Array.isArray(images)
        ? images.forEach((image) => {
            if (typeof image === "string") {
                imageNames.push(image)
            }
        })
        : null

    Array.isArray(youtubeURLs)
        ? youtubeURLs.forEach((youtubeURL) => {
            if (typeof youtubeURL === "string") {
                youtubeURLList.push(youtubeURL)
            }
        })
        : null

    const noticeDocument = {
        writer: currentUser.username,
        title: title,
        content: content,
        images: imageNames,
        thumbnail: thumbnail,
        youtubeURLs: youtubeURLList,
    }

    try {
        const notice = await Notice.create(noticeDocument)
        return res.status(201).send(notice)
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

const getNotice = async (req: Request, res: Response) => {
    const noticeID = req.params["id"]
    if (!isValidObjectId(noticeID)) {
        return res.status(404).send()
    }
    const isNoticeExists = await Notice.exists({ _id: noticeID })
    if (!isNoticeExists) {
        return res.status(404).send()
    }
    const notice = await Notice.findById(req.params["id"])
    return res.send(notice)
}

const updateNotice = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user

    const noticeID = req.params["id"]
    if (!isValidObjectId(noticeID)) {
        return res.status(404).send()
    }
    const isNoticeExists = await Notice.exists({ _id: noticeID })
    if (!isNoticeExists) {
        return res.status(404).send()
    }

    let notice = await Notice.findById(noticeID)
    if (notice?.writer !== currentUser.username) {
        return res.status(403).send()
    }

    for (let key in req.body) {
        if (notice?.get(key) && notice?.get(key) !== req.body[key]) {
            if (key === "images") {
                const images = req.body["images"]
                const imageNames: string[] = []
                Array.isArray(images)
                    ? images.forEach((image) => {
                        if (typeof image === "string") {
                            imageNames.push(image)
                        }
                    })
                    : null
                req.body[key] = imageNames
            } else if (key === "youtubeURLs") {
                const youtubeURLs = req.body["youtubeURLs"]
                const youtubeURLList: string[] = []
                Array.isArray(youtubeURLs)
                    ? youtubeURLs.forEach((youtubeURL) => {
                        if (typeof youtubeURL === "string") {
                            youtubeURLList.push(youtubeURL)
                        }
                    })
                    : null
                req.body[key] = youtubeURLList
            }
            notice.set(key, req.body[key])
        }
    }

    await notice?.save()

    return res.send(notice)
}

const deleteNotice = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user

    const noticeID = req.params["id"]
    if (!isValidObjectId(noticeID)) {
        return res.status(404).send()
    }
    const isNoticeExists = await Notice.exists({ _id: noticeID })
    if (!isNoticeExists) {
        return res.status(404).send()
    }

    const notice = await Notice.findById(noticeID)
    if (notice?.writer !== currentUser.username) {
        return res.status(403).send()
    }
    await Notice.findOneAndDelete({ _id: noticeID })

    return res.status(200).send()
}

const getNotices = async (req: Request, res: Response) => {
    let page: number = (req.query.page ? +(req.query.page as string) : 1) - 1
    page = page < 0 ? 0 : page
    let per_page: number | undefined = req.query.per_page
        ? +(req.query.per_page as string)
        : 15
    per_page = per_page < 0 ? 0 : per_page

    const notices = await Notice.find({})
        .skip(page * per_page)
        .limit(per_page)
        .sort({ _id: -1 })

    const noticesCount = await Notice.countDocuments({})
    const pages = Math.ceil(noticesCount / per_page)
    // filtering feature here

    return res.send({ notices: notices, pages_length: pages })
}

export { addNotice, getNotice, updateNotice, deleteNotice, getNotices }
