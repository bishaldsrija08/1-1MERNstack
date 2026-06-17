const Product = require("../../../models/productModel");

// create product
const createProduct = async (req, res) => {
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;
    if (!productName || !productDescription || !productStockQty || !productStatus || !productPrice) {
        return res.status(400).json({ message: "All fields are required" });
    }

    await Product.create({
        productName,
        productDescription,
        productStockQty,
        productStatus,
        productPrice,
        productImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNxCYXDiJ6LUG-qyO4XnRqqiB8pLwDQvHmKye1Y6ib5A&s=10"
    })

    return res.status(201).json({ message: "Product created successfully" });


}
// get all products

// get single product

// update product

// delete product

module.exports = {
    createProduct
}