const { getAllProducts, getSingleProduct } = require('../../controllers/global/globalController');

const router = require('express').Router();


// Restful API routes for product management
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct)

module.exports = router