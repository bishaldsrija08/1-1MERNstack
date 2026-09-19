const { createProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const { storage, multer, fileFilter, limits } = require('../../../middleware/multerConfig');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();
const upload = multer({ storage, fileFilter, limits })

// surface multer errors (bad file type / too large) as clean 400s instead of a raw 500
const handleUpload = (uploadMiddleware) => (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        next()
    })
}

// Restful API routes for product management
router.route("/create").post(isAuthenticated, checkRole("seller"), handleUpload(upload.single("productImage")), catchAsync(createProduct))
router.route("/products/:id")
    .patch(isAuthenticated, checkRole("seller"), handleUpload(upload.single("productImage")), catchAsync(updateSingleProduct))
    .delete(isAuthenticated, checkRole("seller"), catchAsync(deleteSingleProduct))

module.exports = router