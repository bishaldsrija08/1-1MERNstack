const { getAllProducts, getSingleProduct, getAllOrders } = require('../../controllers/global/globalController');
const checkRole = require('../../middleware/checkRole');
const isAuthenticated = require('../../middleware/isAuthenticated');

const router = require('express').Router();


// Restful API routes for product management
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct)
router.route("/orders").get(isAuthenticated, checkRole("seller", "customer"), getAllOrders)

module.exports = router