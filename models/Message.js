const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
    {
        senderId: {
            type: ObjectId,
            required: [true, "SenderId is required."],
            ref: "User"
        },
        text: {
            type: String,
            required: [true, "Message text is required."],
        },
        receiverId: {
            type: ObjectId,
            required: [true, "ReceiverId is required."],
            ref: "User"
        },
    }, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
