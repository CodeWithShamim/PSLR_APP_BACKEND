
const ProductLink = require("../models/ProductLink");
const { addProductLinkService } = require("../services/productLink.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add productLink /to wishlist
module.exports.addProductLink = catchAsync(async (req, res, next) => {
  try {
    await addProductLinkService(req.body);
    res.status(201).json({
      success: true,
      message: "Product successfully added to wish list!"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

// remove productLink from wishlist
module.exports.removeProductLink = catchAsync(async (req, res, next) => {
  try {
    const link = await ProductLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({
        success: false,
        message: "This link is not found in the database!"
      });

      // next(new AppError('This link is not found in the database!', 404));
    }

    res.status(201).json({
      success: true,
      message: "Product successfully removed from wish list!"
    });
  }
  catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

// get all product links / wishlist
module.exports.getAllProductLinks = catchAsync(async (req, res) => {

  try {
    const userEmail = req.query.email;
    const wishlist = await ProductLink.find({ refByEmail: userEmail });

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }

});
