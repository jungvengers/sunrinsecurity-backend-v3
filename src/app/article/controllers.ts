import { Request, Response } from "express"

const getArticles = (req: Request, res: Response) => {
    // filter articles by category, club, kind
}

const addArticle = (req: Request, res: Response) => {
    // add an article
}

const getArticle = (req: Request, res: Response) => {
    // get an article by id
}

export { getArticles, addArticle, getArticle }
