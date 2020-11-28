import multer from "multer"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "media")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({ storage: storage })

export default upload
