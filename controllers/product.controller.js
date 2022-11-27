const { addProductService } = require("../services/product.service");
const uploader = require("../utils/uploader");

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