const { createOrder, getMyOrders, updateMyOrder, deleteMyOrder } = require('../../../controllers/user/order/orderController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();

router.route("/order").post(isAuthenticated, checkRole("customer"), catchAsync(createOrder)).get(isAuthenticated, checkRole("customer"), catchAsync(getMyOrders));
router.route("/order/:orderId").patch(isAuthenticated, checkRole("customer"), catchAsync(updateMyOrder));
router.route("/order/:orderId").delete(isAuthenticated, checkRole("customer"), catchAsync(deleteMyOrder));
module.exports = router