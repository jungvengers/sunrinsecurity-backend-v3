import { Request, Response } from "express"
import { Article, Club, Kind } from "app/article/models"
import { UserModel } from "app/user/models"
import { isValidObjectId } from "mongoose"

const addArticle = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user
    const {
        isContestWork,
        participants,
        clubs,
        content,
        kinds,
        images,
        youtube_urls,
    } = req.body
    const clubsEnum: Club[] = []
    const kindsEnum: Kind[] = []
    const imageNames: string[] = []
    const youtubeURLs: string[] = []

    Array.isArray(clubs)
        ? clubs.forEach((club) => {
              if (club in Club) {
                  clubsEnum.push(club)
              }
          })
        : null
    Array.isArray(kinds)
        ? kinds.forEach((kind) => {
              if (kind in Kind) {
                  kindsEnum.push(kind)
              }
          })
        : null
    // Filter enum values in clubs and kinds

    Array.isArray(images)
        ? images.forEach((image) => {
              if (typeof image === "string") {
                  imageNames.push(image)
              }
          })
        : null

    Array.isArray(youtube_urls)
        ? youtube_urls.forEach((youtube_url) => {
              if (typeof youtube_url === "string") {
                  youtubeURLs.push(youtube_url)
              }
          })
        : null

    const articleDocument = {
        writer: currentUser.username,
        isContestWork: isContestWork,
        participants: participants,
        clubs: clubsEnum,
        content: content,
        kinds: kindsEnum,
        images: imageNames,
        youtubeURLs: youtubeURLs,
    }

    try {
        const article = await Article.create(articleDocument)
        return res.status(201).send(article)
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

const getArticle = async (req: Request, res: Response) => {
    const articleID = req.params["id"]
    if (!isValidObjectId(articleID)) {
        return res.status(404).send()
    }
    const isArticleExists = await Article.exists({ _id: articleID })
    if (!isArticleExists) {
        return res.status(404).send()
    }
    const article = await Article.findById(req.params["id"])
    return res.send(article)
}

const updateArticle = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user

    const articleID = req.params["id"]
    if (!isValidObjectId(articleID)) {
        return res.status(404).send()
    }
    const isArticleExists = await Article.exists({ _id: articleID })
    if (!isArticleExists) {
        return res.status(404).send()
    }

    let article = await Article.findById(articleID)
    if (article?.writer !== currentUser.username) {
        return res.status(403).send()
    }

    for (let key in req.body)
        if (article?.get(key) && article?.get(key) !== req.body[key]) {
            if (key === "clubs") {
                const clubs = req.body["clubs"]
                const clubsEnum: Club[] = []
                Array.isArray(clubs)
                    ? clubs.forEach((club) => {
                          if (club in Club) {
                              clubsEnum.push(club)
                          }
                      })
                    : null
                req.body[key] = clubsEnum
            } else if (key === "kinds") {
                const kinds = req.body["kinds"]
                const kindsEnum: Kind[] = []
                Array.isArray(kinds)
                    ? kinds.forEach((kind) => {
                          if (kind in Kind) {
                              kindsEnum.push(kind)
                          }
                      })
                    : null
                req.body[key] = kindsEnum
            } else if (key === "images") {
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
            }
            article.set(key, req.body[key])
        }

    await article?.save()

    return res.send(article)
}

const deleteArticle = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user

    const articleID = req.params["id"]
    if (!isValidObjectId(articleID)) {
        return res.status(404).send()
    }
    const isArticleExists = await Article.exists({ _id: articleID })
    if (!isArticleExists) {
        return res.status(404).send()
    }

    const article = await Article.findById(articleID)
    if (article?.writer !== currentUser.username) {
        return res.status(403).send()
    }
    await Article.findOneAndDelete({ _id: articleID })

    return res.status(200).send()
}

const getArticles = async (req: Request, res: Response) => {
    let page: number = (req.query.page ? +(req.query.page as string) : 1) - 1
    page = page < 0 ? 0 : page
    let per_page: number | undefined = req.query.per_page
        ? +(req.query.per_page as string)
        : 15
    per_page = per_page < 0 ? 0 : per_page

    const filterableFields = ["isContestWork", "kinds", "clubs", "writer"]
    const findQuery: any = {}

    filterableFields.forEach((field) => {
        if (field in req.query) {
            try {
                findQuery[field] = {
                    $in: JSON.parse(req.query[field] as string),
                }
            } catch (error) {}
        }
    })

    const articles = await Article.find(findQuery)
        .skip(page * per_page)
        .limit(per_page)
        .sort({ _id: -1 })

    const articlesCount = await Article.countDocuments({})
    const pages = Math.ceil(articlesCount / per_page)
    // filtering feature here

    return res.send({ articles: articles, pages_length: pages })
}

export { addArticle, getArticle, updateArticle, deleteArticle, getArticles }
