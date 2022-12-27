const Conversation = require("../models/Conversation");
const catchAsync = require("../utils/catchAsync");

// new conversation add controller
module.exports.addConversation = catchAsync(async (req, res, next) => {
    const { senderId, receiverId } = req.body;

    const coversation = new Conversation({ members: [senderId, receiverId] })
    const savedConversation = await coversation.save();

    res.status(201).json({
        success: true,
        message: "Successfully conversation added.",
        conversations: savedConversation,
    });
});

//get conv of a user controller
module.exports.getConvByUser = catchAsync(async (req, res, next) => {
    const conversations = await Conversation.find({
        members: { $in: [req.params.userId] },
    });

    res.status(201).json({
        success: true,
        message: "Successfully conversation find for a user.",
        conversations,
    });
});


// get conv includes two userId controller
module.exports.getConvByTwoUser = catchAsync(async (req, res, next) => {
    const { firstUserId, secondUserId } = req.params;
    const conversations = await Conversation.find({ members: { $all: [firstUserId, secondUserId] } })

    res.status(201).json({
        success: true,
        message: "Successfully conversation find for include two user.",
        conversations,
    });
});