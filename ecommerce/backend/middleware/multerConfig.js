const multer = require('multer')
const path = require('path')

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        // sanitize the extension so a crafted filename can't escape the uploads folder
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
    }
})

// reject disallowed file types before they ever touch disk
const fileFilter = (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(new Error("Invalid file type. Only JPEG, PNG, JPG, GIF, and WEBP are allowed."))
    }
    cb(null, true)
}

// multer only knows the real file size once the stream finishes, so the limit
// must live in `limits`, not inside `destination`/`fileFilter`.
const limits = { fileSize: 2 * 1024 * 1024 } // 2MB

module.exports = {
    multer,
    storage,
    fileFilter,
    limits
}