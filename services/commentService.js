const Comment = require("../models/commentModel");
const apiError = require("../utils/apiError");

exports.createComment = async (body, user) => {
  try {
    if (!body.content) {
      throw new apiError("Content is required", 400);
    }
    body.userId = user._id;
    const comment = await Comment.create(body);
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.getAllCommentsWithUser = async () => {
  try {
    const comments = await Comment.find().populate("userId");
    return comments;
  } catch (error) {
    throw error;
  }
};

exports.getCommentById = async (id) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) throw new apiError("Comment not found", 404);
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.deleteComment = async (id, user) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) throw new apiError("Comment not found", 404);

    // Authorization check
    if (comment.userId.toString() !== user._id.toString() && user.role !== "admin") {
      throw new apiError("Unauthorized", 401);
    }

    await Comment.findByIdAndDelete(id);
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.updateComment = async (commentId, user, body) => {
  try {
    if (!body.content) {
      throw new apiError("Content is required", 400);
    }

    const comment = await Comment.findById(commentId);
    if (!comment) throw new apiError("Comment not found", 404);

    // Authorization check
    if (comment.userId.toString() !== user._id.toString() && user.role !== "admin") {
      throw new apiError("Unauthorized", 401);
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, body, { new: true });
    return updatedComment;
  } catch (error) {
    throw error;
  }
};
