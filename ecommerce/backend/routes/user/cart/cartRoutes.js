const { addToCart, getCartItems, removeFromCart, clearCart, updateProductInCart } = require("../../../controllers/user/cart/carController");
const checkRole = require("../../../middleware/checkRole");
const isAuthenticated = require("../../../middleware/isAuthenticated");

const router = require("express").Router();

router.route("/add/:productId").post(isAuthenticated,checkRole("customer") ,addToCart);
router.route("/").get(isAuthenticated, checkRole("customer"), getCartItems);
router.route("/remove/:productId").delete(isAuthenticated, checkRole("customer"), removeFromCart);
router.route("/update/:productId").patch(isAuthenticated, checkRole("customer"), updateProductInCart);
router.route("/clear").delete(isAuthenticated, checkRole("customer"), clearCart);




module.exports = router;