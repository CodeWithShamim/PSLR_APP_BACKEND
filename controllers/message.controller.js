const Message = require("../models/Message");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add message controller
module.exports.addMessage = catchAsync(async (req, res, next) => {
    const messageData = req.body;
    await Message.create(messageData)

    res.status(201).json({
        success: true,
        message: "Successfully message added.",
    });
});

// get message controller
module.exports.getMessage = catchAsync(async (req, res, next) => {
    if (!req.query.senderId || !req.query.receiverId) {
        return next(new AppError("Info can't find.", 500));
    }

    const messages = await Message.find(req.query);
    res.status(201).json({
        success: true,
        message: "Successfully message find.",
        messages,
    });
});