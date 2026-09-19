const Product = require("../../../models/productModel");
const fs = require("fs");
const path = require("path");

// build an absolute, environment-correct URL for an uploaded file
const buildImageUrl = (req, filename) => `${req.protocol}://${req.get("host")}/uploads/${filename}`;

// pull the stored filename out of a previously generated image URL
const getStoredFileName = (imageUrl) => {
    if (!imageUrl) return null;
    try {
        return decodeURIComponent(new URL(imageUrl).pathname.split("/").pop());
    } catch {
        return null;
    }
};

// remove an uploaded file from disk, ignoring "already gone" errors
const removeUploadedFile = (fileName) => {
    if (!fileName) return;
    const filePath = path.join("uploads", fileName);
    fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
            console.log(err);
        }
    });
};

const validateProductFields = ({ productName, productDescription, productStockQty, productStatus, productPrice }) => {
    if (!productName || !productDescription || productStockQty === undefined || productStockQty === "" || !productStatus || productPrice === undefined || productPrice === "") {
        return "All fields are required";
    }
    if (!["in-stock", "out-of-stock"].includes(productStatus)) {
        return "Invalid product status";
    }
    const price = Number(productPrice);
    const stockQty = Number(productStockQty);
    if (Number.isNaN(price) || price < 0) {
        return "Product price must be a non-negative number";
    }
    if (!Number.isInteger(stockQty) || stockQty < 0) {
        return "Product stock quantity must be a non-negative whole number";
    }
    return null;
};

// create product
const createProduct = async (req, res) => {
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;

    const validationError = validateProductFields(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "Product image is required" });
    }

    await Product.create({
        productName: productName.trim(),
        productDescription: productDescription.trim(),
        productStockQty: Number(productStockQty),
        productStatus,
        productPrice: Number(productPrice),
        productImageUrl: buildImageUrl(req, file.filename)
    })

    return res.status(201).json({ message: "Product created successfully" });
}



// update product
const updateSingleProduct = async (req, res) => {
    const id = req.params.id;
    const { productName, productDescription, productStockQty, productStatus, productPrice } = req.body;

    const validationError = validateProductFields(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const file = req.file;
    const update = {
        productName: productName.trim(),
        productDescription: productDescription.trim(),
        productStockQty: Number(productStockQty),
        productStatus,
        productPrice: Number(productPrice),
    };

    // image re-upload is optional on edit; only swap files when a new one is provided
    if (file) {
        removeUploadedFile(getStoredFileName(product.productImageUrl));
        update.productImageUrl = buildImageUrl(req, file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct })
}
// delete product
const deleteSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    removeUploadedFile(getStoredFileName(product.productImageUrl));

    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
}

module.exports = {
    createProduct,
    updateSingleProduct,
    deleteSingleProduct
}