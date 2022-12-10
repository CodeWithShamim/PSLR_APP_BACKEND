const Conversation = require("../models/Conversation");
const catchAsync = require("../utils/catchAsync");

// add conversation controller
module.exports.addConversation = catchAsync(async (req, res, next) => {
    const conversationData = req.body;
    const isExits = await Conversation.find(conversationData)

    if (isExits.length === 0) {
        await Conversation.create(conversationData);
    } else {
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
    let conversations = []
    conversations = await Conversation.find({ senderId: req.params.id }).populate("senderId receiverId");
    const checkReceiver = await Conversation.find({ receiverId: req.params.id }).populate("senderId receiverId");
    if (checkReceiver.length !== 0) conversations.push(checkReceiver);

    res.status(201).json({
        success: true,
        message: "Successfully conversation find.",
        conversations,
    });
});