const createOrder = require('../../../controllers/user/order/orderController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');

const router = require('express').Router();

router.route("/order").post(isAuthenticated, checkRole("customer"), createOrder)

module.exports = router