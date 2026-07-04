const Product = require("../../../models/productModel");
const fs = require("fs");

// create product
const createProduct = async (req, res) => {
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;
    if (!productName || !productDescription || !productStockQty || !productStatus || !productPrice) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "Product image is required" });
    } else {
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



// update product
const updateSingleProduct = async (req, res) => {
    const id = req.params.id;
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;
    console.log(req.body, "haha")
    if (!productName || !productDescription || !productStockQty || !productStatus || !productPrice) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const oldImagePath = product.productImageUrl
    // http://localhost:3000/uploads/1783008589024-result.png
    // Need = 1783008589024-result.png
    // split the oldImagePath to get the file name
    const siteUrl = "http://localhost:3000/uploads/"
    const oldImageFileName = oldImagePath.split(siteUrl)[1]

    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "Product image is required" });
    } else {
        fs.unlink(`uploads/${oldImageFileName}`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Old image deleted successfully")
            }
        })
    }

    const filePath = file.filename;

    await Product.findByIdAndUpdate(id, {
        productName,
        productDescription,
        productStockQty,
        productStatus,
        productPrice,
        productImageUrl: `http://localhost:3000/uploads/${filePath}`
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
    // delete the product image from uploads folder
    const oldImagePath = product.productImageUrl
    // http://localhost:3000/uploads/1783008589024-result.png
    // Need = 1783008589024-result.png
    // split the oldImagePath to get the file name
    const siteUrl = "http://localhost:3000/uploads/"
    const oldImageFileName = oldImagePath.split(siteUrl)[1]
    fs.unlink(`uploads/${oldImageFileName}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Old image deleted successfully")
        }
    })
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
}

module.exports = {
    createProduct,
    updateSingleProduct,
    deleteSingleProduct
}