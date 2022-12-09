const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema(
    {
        senderId: {
            type: ObjectId,
            required: [true, "SenderId is required."],
            ref: "User"
        },
        receiverId: {
            type: ObjectId,
            required: [true, "ReceiverId is required."],
            ref: "User"
        },
    }, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
