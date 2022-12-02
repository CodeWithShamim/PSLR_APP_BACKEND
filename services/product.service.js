const Product = require("../models/Product");
const Report = require("../models/Report");

// add product 
module.exports.addProductService = async (productData) => {
    return await Product.create(productData);
}

// get all products 
module.exports.getProductsService = async (skip = 0, searchText = "", limit = 10,) => {
    if (searchText) {
        return await Product.find({ $text: { $search: searchText } })
            .limit(limit)
            .skip(skip)
    }
    return await Product.find({})
        .limit(limit)
        .skip(skip)
}

// report a product 
module.exports.reportProductService = async (reportData) => {
    return await Report.create(reportData);
}