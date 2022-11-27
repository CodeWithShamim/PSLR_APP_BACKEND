const { addProductService } = require("../services/product.service");

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