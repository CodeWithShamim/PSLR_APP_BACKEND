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
    const {senderId, conversationId} = req.params;

    let messages = []
     messages = await Message.find({senderId, conversationId });
     const newMessages = await Message.find({conversationId, senderId });
     messages.push(newMessages);
    
    res.status(201).json({
        success: true,
        message: "Successfully message find.",
        messages,
    });
});