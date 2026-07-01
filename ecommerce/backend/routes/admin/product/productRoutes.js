const { createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const { storage, multer } = require('../../../middleware/multerConfig');

const router = require('express').Router();
const upload = multer({storage:storage})

// Restful API routes for product management
router.route("/create").post(isAuthenticated, checkRole("seller"),upload.single("productImage") ,createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct).patch(isAuthenticated, checkRole("seller"), updateSingleProduct).delete(isAuthenticated, checkRole("seller"), deleteSingleProduct)

module.exports = router