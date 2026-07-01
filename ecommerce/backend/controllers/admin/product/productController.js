const Product = require("../../../models/productModel");

// create product
const createProduct = async (req, res) => {
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;
    if (!productName || !productDescription || !productStockQty || !productStatus || !productPrice) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const file = req.file;
    if(!file){
        return res.status(400).json({ message: "Product image is required" });
    }else{
        const filePath = file.filename;
    }


    await Product.create({
        productName,
        productDescription,
        productStockQty,
        productStatus,
        productPrice,
        productImageUrl: `http://localhost:3000/uploads/${file.filename}`
    })

    return res.status(201).json({ message: "Product created successfully" });
}

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

// update product
const updateSingleProduct = async (req, res) => {
    const id = req.params.id;
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;
    if (!productName || !productDescription || !productStockQty || !productStatus || !productPrice) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndUpdate(id, {
        productName,
        productDescription,
        productStockQty,
        productStatus,
        productPrice,
        productImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNxCYXDiJ6LUG-qyO4XnRqqiB8pLwDQvHmKye1Y6ib5A&s=10"
    })
    res.status(200).json({ message: "Product updated successfully" })
}
// delete product
const deleteSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
}