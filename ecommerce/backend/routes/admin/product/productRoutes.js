const { createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');
const isAuthenticated = require('../../../middleware/isAuthenticated');

const router = require('express').Router();


// Restful API routes for product management
router.route("/create").post(isAuthenticated, createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct).patch(isAuthenticated, updateSingleProduct).delete(isAuthenticated, deleteSingleProduct)

module.exports = router