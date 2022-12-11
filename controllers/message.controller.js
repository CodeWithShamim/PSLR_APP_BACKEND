const Message = require("../models/Message");
const catchAsync = require("../utils/catchAsync");

// add message controller
module.exports.addMessage = catchAsync(async (req, res, next) => {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    res.status(201).json({
        success: true,
        message: "Successfully message added.",
        savedMessage,
    });
});

// get message controller
module.exports.getMessage = catchAsync(async (req, res, next) => {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(201).json({
        success: true,
        message: "Successfully message find.",
        messages,
    });
});