const { getAllOrders, updateOrderStatus } = require("../../../controllers/admin/order/orderController");
const checkRole = require("../../../middleware/checkRole");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const catchAsync = require("../../../services/catchAsync");

const router = require("express").Router();
router.route("/").get(isAuthenticated, checkRole("seller"),catchAsync(getAllOrders));
router.route("/:orderId").patch(isAuthenticated, checkRole("seller"),catchAsync(updateOrderStatus));




module.exports = router;