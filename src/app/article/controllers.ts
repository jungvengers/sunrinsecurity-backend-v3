import { Request, Response } from "express"
import { Article, Club, Kind } from "app/article/models"
import { UserModel } from "app/user/models"
import { isValidObjectId } from "mongoose"

const nullableJSONParse = (value: any) => {
    try {
        return JSON.parse(value as any)
    } catch (error) {
        console.log(error)
    }
    return null
}

const addArticle = async (req: Request, res: Response) => {
    const currentUser: UserModel | any = req.user
    const { isContestWork, participants, clubs, content, kinds } = req.body
    const clubsEnum: Club[] = []
    const kindsEnum: Kind[] = []
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

    const articleDocument = {
        writer: currentUser.username,
        isContestWork: isContestWork,
        participants: participants,
        clubs: clubsEnum,
        content: content,
        kinds: kindsEnum,
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
        if (article?.get(key) && article?.get(key) !== req.body[key])
            article.set(key, req.body[key])

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

    const filterableFields = ["isContestWork", "kinds", "clubs"]

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
