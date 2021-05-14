import AWS from "aws-sdk"
import { createReadStream } from "fs"
import env from "config/env"

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com")
const region = "kr-standard"

const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
        accessKeyId: env.NCP_ACCESS_KEY as string,
        secretAccessKey: env.NCP_SECRET_KEY as string
    }
})
const Bucket = process.env.NODE_ENV === "test" ? "sunrin-test" : "sunrin"

export const s3Upload = async (path: string, Key: string) =>
    await S3.putObject({
        Bucket,
        Key,
        ACL: "public-read",
        Body: createReadStream(path)
    }).promise()

export const s3Delete = async (Key: string) =>
    await S3.deleteObject({
        Bucket,
        Key
    }).promise()