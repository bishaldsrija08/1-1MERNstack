const Product = require("../../models/productModel");

// get all products
const getAllProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        message: "Products fetched successfully",
        data: products
    });
}



// get single product
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
        message: "Product fetched successfully",
        data: product
    });
}


module.exports = {
    getAllProducts,
    getSingleProduct
}