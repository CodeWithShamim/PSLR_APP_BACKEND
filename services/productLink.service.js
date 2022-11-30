const ProductLink = require("../models/ProductLink");

// add product 
module.exports.addProductLinkService = async (productLinkData) => {
    return await ProductLink.create(productLinkData);
}