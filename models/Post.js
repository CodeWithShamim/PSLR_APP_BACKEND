const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Types.ObjectId;

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a post title."],
    minLength: [5, "Post title must be at least 5 characters."],
    maxLength: [100, "Post title is too large"],
  },
  description: {
    type: String,
    required: [true, "Post description is required"],
  },
  category: {
    type: String,
    required: [true, "Please select a post category."],
  },
  subCategory: {
    type: String,
  },
  images: [
    {
      type: String,
    }
  ],
  status: {
    type: String,
    enum: ["pending", "accept", "reject",],
    default: "pending"
  },
  refById: {
    type: ObjectId,
    required: [true, "User id is required!"],
    // select: false,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
});

PostSchema.index({ title: 'text', category: 'text' })
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
