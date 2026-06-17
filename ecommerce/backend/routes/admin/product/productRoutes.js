const { createProduct } = require('../../../controllers/admin/product/productController');

const router = require('express').Router();



router.route("/create").post(createProduct)




module.exports = router