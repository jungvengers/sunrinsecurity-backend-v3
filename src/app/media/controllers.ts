import { Request, Response } from "express"

const uploadMedia = (req: Request, res: Response) => {
    return res.send({ filename: req.file.filename })
}

export { uploadMedia }
