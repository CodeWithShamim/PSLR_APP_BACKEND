const Shipping = require("../models/Shipping");
const catchAsync = require("../utils/catchAsync");

// request shipping controller 
module.exports.addShipping = catchAsync(async (req, res, next) => {
    const shippingData = { ...req.body, reference: req.user.email }
    await Shipping.create(shippingData);
    res.status(201).json({
        success: true,
        message: "Shipping successfully added!",
    });
});