const ProductLink = require("../models/ProductLink");
const { addProductLinkService } = require("../services/productLink.service");


// add productLink 
module.exports.addProductLink = async (req, res) => {
    try {
        const productLinkData = req.body;
        const result = await addProductLinkService(productLinkData);

        res.status(200).json({
            success: true,
            message: "Product added the wish list!",
            product: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
// get all product links
module.exports.getAllProductLinks = async (req, res) => {
    try {
        const links = await ProductLink.find();
        res.status(200).json({
            success: true,
            wishlists: links,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};