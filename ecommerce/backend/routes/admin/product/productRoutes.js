const { createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');

const router = require('express').Router();


// Restful API routes for product management
router.route("/create").post(isAuthenticated, checkRole("seller"), createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct).patch(isAuthenticated, checkRole("seller"), updateSingleProduct).delete(isAuthenticated, checkRole("seller"), deleteSingleProduct)

module.exports = router