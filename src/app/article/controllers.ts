import { Request, Response } from "express"
import { Article, Club, Kind } from "app/article/models"
import { UserModel } from "app/user/models"
import { isValidObjectId } from "mongoose"

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
}

const addArticle = (req: Request, res: Response) => {
    // add an article
}

const getArticle = (req: Request, res: Response) => {
    // get an article by id
}

export { getArticles, addArticle, getArticle }
