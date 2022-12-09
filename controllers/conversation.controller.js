const Conversation = require("../models/Conversation");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add conversation controller
module.exports.addConversation = catchAsync(async (req, res, next) => {
    const conversationData = req.body;
    const isExits = await Conversation.find(conversationData)

    if (isExits.length === 0) {
        await Conversation.create(conversationData);
    }else{
       return res.status(201).json({
            success: false,
            message: "Conversation already exits.",
        }); 
    }

    res.status(201).json({
        success: true,
        message: "Successfully conversation added.",
    });
});

// get all conversations controller
module.exports.getConversations = catchAsync(async (req, res, next) => {
    const conversations= await Conversation.find({});
    if (!conversations) {
        return next(new AppError("Can't find conversation.", 500));
    }

    res.status(201).json({
        success: true,
        message: "Successfully conversation find.",
        conversations,
    });
});