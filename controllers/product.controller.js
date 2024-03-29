const {
    addProductService,
    getProductsService,
    getProductsByStatusService,
    updateProductStatusService,
    getMyProductService,
    updateProductService
} = require("../services/product.service");
const uploader = require("../utils/uploader");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product");
const Report = require("../models/Report");

module.exports.getProducts = catchAsync(async (req, res, next) => {
    const { skip, searchText } = req.query;
    const products = await getProductsService(skip, searchText);

    if (!products) {
        return next(new AppError("Can't find any product", 404));
    }

    res.status(201).json({
        success: true,
        message: "All products successfully find",
        products,
    });
});

// get all pending products controller
module.exports.getProductsByStatus = catchAsync(async (req, res, next) => {
    const products = await getProductsByStatusService(req.params.status);

    if (!products) {
        return next(new AppError("Can't find any product", 404));
    }

    res.status(201).json({
        success: true,
        message: "All pending products successfully find",
        products,
    });
});


// update Product Status controller
module.exports.updateProductStatus = catchAsync(async (req, res, next) => {
    const data = req.body;
    const result = await updateProductStatusService(data);
    if (!result) {
        return next(new AppError("Can't Changed product status.", 403));
    }

    res.status(201).json({
        success: true,
        message: "Product status changed.",
    });
});


// update Product controller
module.exports.updateProduct = catchAsync(async (req, res, next) => {
    const data = req.body;
    const result = await updateProductService({ ...data, reference: req.user.email });
    if (!result) {
        return next(new AppError("Can't producted this product info.", 403));
    }

    res.status(201).json({
        success: true,
        message: "Successfully product updated.",
    });
});


// upload product image controller 
module.exports.uploadProductImage = async (req, res) => {
    try {
        //=============== upload image in aws s3 ===============
        const multipleUploader = uploader().array("image-upload")
        multipleUploader(req, res, (err) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: err.message
                })
            }

            let images = [];
            req.files?.forEach((file) => {
                images.push(file.location)
            })

            res.status(200).json({
                success: true,
                images,
            })
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// add product controller 
module.exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const result = await addProductService({ ...productData, reference: req.user.email });

        res.status(200).json({
            success: true,
            message: "Successfully product added",
            product: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports.getMyProduct = catchAsync(async (req, res, next) => {
    const products = await getMyProductService(req.user.email);

    if (!products) {
        return next(new AppError("Can't find any product", 404));
    }

    res.status(201).json({
        success: true,
        message: "All my products successfully find",
        products,
    });
});

module.exports.removeProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id)
    if (!result) return next(new AppError("Can't delete this product", 404));
    await Report.deleteMany({ productID: id })

    res.status(201).json({
        success: true,
        message: "Successfully deleted this product.",
    });
});