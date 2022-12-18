const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const { findUserByEmail } = require("../services/user.service");
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

// add message controller
module.exports.addMultipleMessage = catchAsync(async (req, res, next) => {
    const users = await User.find({ role: "user" });
    const { _id: adminId } = await findUserByEmail(req.user.email);

    if (users.length !== 0) {
        for (let i = 0; i < users.length; i++) {
            const isConversationExit = await Conversation.find({ members: { $in: [String(users[i]._id)] } })

            if (isConversationExit.length !== 0) {
                await Message.create({
                    senderId: adminId,
                    text: req.body.message,
                    // image: ,
                    receiverId: users[i]._id,
                    conversationId: isConversationExit[0]._id,
                    createdAt: Date.now(),
                })
            }

            else {

                const newConversation = new Conversation({ members: [String(users[i]._id), String(adminId)] })
                const savedConversation = await newConversation.save()

                savedConversation && await Message.create({
                    senderId: adminId,
                    text: req.body.message,
                    // image: ,
                    receiverId: users[i]._id,
                    conversationId: savedConversation._id,
                    createdAt: Date.now(),
                })
            }
        }
    }

    res.status(201).json({
        success: true,
        message: "Successfully message added.",
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