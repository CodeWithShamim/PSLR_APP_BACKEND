const Product = require("../models/Product");

// add product 
module.exports.addProductService = async (productData) => {
    return await Product.create(productData);
}