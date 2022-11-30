
const ProductLink = require("../models/ProductLink");
const { addProductLinkService } = require("../services/productLink.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add productLink /to wishlist
module.exports.addProductLink = catchAsync(async (req, res,next) => {
  await addProductLinkService(req.body);
  res.status(201).json({
    success: true,
    message: "Product successfully added to wish list!"
  });
});
// remove productLink from wishlist
module.exports.removeProductLink = catchAsync(async (req, res,next) => {
 const link = await ProductLink.findByIdAndDelete(req.params.id);
 if (!link) {
  return next(new AppError('This link is not found in the database!', 404));
}
  res.status(201).json({
    success: true,
    message: "Product successfully removed from wish list!"
  });
});

// get all product links / wishlist
module.exports.getAllProductLinks = catchAsync(async (req, res) => {
  const wishlist = await ProductLink.find();
  res.status(200).json({
    success: true,
    wishlist,
  });
});
