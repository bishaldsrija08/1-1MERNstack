const { createProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const { storage, multer } = require('../../../middleware/multerConfig');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();
const upload = multer({ storage: storage })

// Restful API routes for product management
router.route("/create").post(isAuthenticated, checkRole("seller"), upload.single("productImage"), catchAsync(createProduct))
router.route("/products/:id").patch(isAuthenticated, checkRole("seller"), upload.single("productImage"), catchAsync(updateSingleProduct)).delete(isAuthenticated, checkRole("seller"), catchAsync(deleteSingleProduct))

module.exports = router