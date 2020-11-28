import { Request, Response } from "express"

const uploadMedia = (req: Request, res: Response) => {
    return res.status(201).send({ filename: req.file.filename })
}

export { uploadMedia }
