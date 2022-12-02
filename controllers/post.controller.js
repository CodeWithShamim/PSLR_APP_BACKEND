const Post = require("../models/Post");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const uploader = require("../utils/uploader");

// add Post
module.exports.addPost = catchAsync(async (req, res, next) => {
  await Post.create(req.body);
  res.status(201).json({
    success: true,
    message: "Post successfully added!",
  });
});
// update Post
module.exports.updatePost = catchAsync(async (req, res, next) => {
  await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    message: "Post successfully updated!",
  });
});

// remove Post
module.exports.removePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError("This post is not found in the database!", 404));
  }
  res.status(201).json({
    success: true,
    message: "Post successfully deleted!",
  });
});

// get all Posts
module.exports.getAllPosts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .fieldLimiting()
    .paginate();

  const posts = await features.query;
  res.status(200).json({
    success: true,
    length: posts.length,
    posts,
  });
});
// get all Posts
module.exports.getMyPosts = catchAsync(async (req, res) => {
  const posts = await Post.find({ refByEmail: req.user.email });
  res.status(200).json({
    success: true,
    length: posts.length,
    posts,
  });
});
// get single Post
module.exports.getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({
    success: true,
    post,
  });
});

// Upload Post Image
module.exports.uploadPostImage = catchAsync(async (req, res, next) => {
  //=============== upload image in aws s3 ===============
  const multipleUploader = uploader().array("image-upload");
  multipleUploader(req, res, (err) => {
    if (err) {
      return next(new AppError(err.message, 404));
    }

    let images = [];
    req.files?.forEach((file) => {
      images.push(file.location);
    });

    res.status(200).json({
      success: true,
      images,
    });
  });
});
