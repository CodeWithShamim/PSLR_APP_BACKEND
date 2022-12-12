const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
    {
        senderId: {
            type: ObjectId,
            required: [true, "senderId is required."],
            ref: "User"
        },
        receiverId: {
            type: ObjectId,
            required: [true, "receiverId is required."],
            ref: "User"
        },
        image: {
            type: String
        },
        text: {
            type: String,
        },
        conversationId: {
            type: ObjectId,
            required: [true, "conversationId is required."],
            ref: "User"
        },
    }, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
