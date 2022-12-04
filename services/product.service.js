const Product = require("../models/Product");
const Report = require("../models/Report");

module.exports.addProductService = async (productData) => {
    return await Product.create(productData);
}

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

module.exports.getPendingProductsService = async () => {
    return await Product.find({ status: "pending" }).limit(10)
}

module.exports.updateProductStatusService = async (data) => {
    return await Product.findByIdAndUpdate(data.id, { status: data.status }, {
        runValidators: true,
    })
}

module.exports.updateProductService = async (data) => {
    return await Product.findByIdAndUpdate(data.id, {
        images: data.images,
        title: data.title,
        price: data.price,
        description: data.description,
        location: data.location,
        productUsesDate: data.productUsesDate,
        condition: data.condition,
        status: data.status,
        reference: data.email,
    },
        {
            runValidators: true,
            new: true,
        })
}

module.exports.getMyProductService = async (email) => {
    return await Product.find({ reference: email })
}