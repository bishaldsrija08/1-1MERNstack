const { createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('../../../controllers/admin/product/productController');

const router = require('express').Router();


// Restful API routes for product management
router.route("/create").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct).patch(updateSingleProduct).delete(deleteSingleProduct)


module.exports = router