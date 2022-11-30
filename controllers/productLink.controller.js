
const ProductLink = require("../models/ProductLink");
const { addProductLinkService } = require("../services/productLink.service");
const catchAsync = require("../utils/catchAsync");

// add productLink /to wishlist
module.exports.addProductLink = catchAsync(async (req, res,next) => {
  await addProductLinkService(req.body);
  res.status(201).json({
    success: true,
    message: "Product successfully added to wish list!"
  });
});

// get all product links /wishlist
module.exports.getAllProductLinks = catchAsync(async (req, res) => {
  const wishlist = await ProductLink.find();
  res.status(200).json({
    success: true,
    wishlist,
  });
});
