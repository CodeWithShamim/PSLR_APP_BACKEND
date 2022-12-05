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

// get shipping controller 
module.exports.getShipping = catchAsync(async (req, res, next) => {
    const shippings = await Shipping.find({ status: "pending" });
    res.status(201).json({
        success: true,
        message: "Successfully find all shippings.",
        shippings,
    });
});

// update shipping status controller 
module.exports.updateShippingStatus = catchAsync(async (req, res, next) => {
    const data = req.body;
    const result = await Shipping.findByIdAndUpdate(data.id, { status: data.status }, {
        runValidators: true,
    })
    if (!result) {
        return next(new AppError("Can't Changed shipping status.", 403));
    }

    res.status(201).json({
        success: true,
        message: "Shipping status changed.",
    });
});