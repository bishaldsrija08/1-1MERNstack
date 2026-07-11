const createOrder = require('../../../controllers/user/order/orderController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();

router.route("/order").post(isAuthenticated, checkRole("customer"), catchAsync(createOrder))

module.exports = router