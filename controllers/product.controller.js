const { addProductService, getProductsService, reportProductService } = require("../services/product.service");
const uploader = require("../utils/uploader");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// get all products controller
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
        const result = await addProductService(productData);

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

// report product controller
module.exports.reportProduct = catchAsync(async (req, res, next) => {
    const reportData = req.body;
    const result = await reportProductService(reportData);

    if (!result) {
        return next(new AppError("Can't find any product", 404));
    }

    res.status(201).json({
        success: true,
        message: "Thanks for reporting.",
    });
});