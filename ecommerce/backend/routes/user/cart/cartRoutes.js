const { addToCart, getCartItems, removeFromCart, clearCart, updateProductInCart } = require("../../../controllers/user/cart/carController");
const checkRole = require("../../../middleware/checkRole");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const catchAsync = require("../../../services/catchAsync");

const router = require("express").Router();

router.route("/add/:productId").post(isAuthenticated,checkRole("customer") ,catchAsync(addToCart));
router.route("/").get(isAuthenticated, checkRole("customer"), catchAsync(getCartItems));
router.route("/remove/:productId").delete(isAuthenticated, checkRole("customer"), catchAsync(removeFromCart));
router.route("/update/:productId").patch(isAuthenticated, checkRole("customer"), catchAsync(updateProductInCart));
router.route("/clear").delete(isAuthenticated, checkRole("customer"), catchAsync(clearCart));




module.exports = router;