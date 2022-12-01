const Product = require("../models/Product");

// add product 
module.exports.addProductService = async (productData) => {
    return await Product.create(productData);
}

// get all products 
module.exports.getProductsService = async (skip = 0, limit = 4, ) => {
    return await Product.find({})
    .limit(limit)
    .skip(skip)
    .select("title images price")
    ;
}