const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment is required!"],
        },
        imageUrl: {
            type: String,
            required: [true, "User url is required."],
            validate: [validator.isURL, "Not a valid url!"],
        },
        name: {
            type: String,
            required: [true, "Username is required!"],
        },
        userId: {
            type: String,
            required: [true, "User ID is required!"],
        },
        postId: {
            type: String,
            required: [true, "Post ID is required!"],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
          },
    });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
