const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment is required!"],
        },
        image_url: {
            type: String,
            validate: [validator.isURL, "Not a valid url!"],
        },
        name: {
            type: String,
            required: [true, "Username is required!"],
        },
        user_id: {
            type: String,
            required: [true, "User ID is required!"],
        },
        post_id: {
            type: String,
            required: [true, "Post ID is required!"],
        },
        created_at: {
            type: Date,
            default: Date.now(),
            select: false,
          },
    });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
