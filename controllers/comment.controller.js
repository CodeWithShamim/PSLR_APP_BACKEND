const Comment = require("../models/Comment");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add Comment 
module.exports.addComment = catchAsync(async (req, res,next) => {
    await Comment.create(req.body);
  res.status(201).json({
    success: true,
    message: "Comment successfully added!"
  });
});

// remove Comment
module.exports.removeComment = catchAsync(async (req, res,next) => {
  const link = await Comment.findByIdAndDelete(req.params.id);
  if (!link) {
   return next(new AppError('This link is not found in the database!', 404));
 }
   res.status(201).json({
     success: true,
     message: "Comment successfully deleted!"
   });
 });

// get all comments
module.exports.getAllComments = catchAsync(async (req, res,next) => {
  if (!req.query.post_id) {
    return next(new AppError('Post id is not given!', 404));
  }
    const features = new APIFeatures(Comment.find({post_id:req.query.post_id}), req.query)
    .sort()
    .fieldLimiting()
    .paginate();

  const comments = await features.query;
  res.status(200).json({
    success: true,
    comments,
  });
});