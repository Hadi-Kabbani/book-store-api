const commentService = require("../services/commentService");
exports.createComment = async (req, res, next) => {
  const body = req.body;
  try {
    const comment = await commentService.createComment(body, req.user);
    return res.status(200).send({ status: "success", data: comment });
  } catch (error) {
    next(error);
  }
};

exports.getAllCommentsWithUser = async (req, res, next) => {
  try {
    const comments = await commentService.getAllCommentsWithUser();
    return res.status(200).send({ status: "success", data: comments });
  } catch (error) {
    next(error);
  }
};

exports.getCommentById = async (req, res, next) => {
  const id = req.params.commentId;
  try {
    const comment = await commentService.getCommentById(id);
    return res.status(200).send({ status: "success", data: comment });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const id = req.params.commentId;
  try {
    const comment = await commentService.deleteComment(id, req.user);
    return res.status(200).send({ status: "success", message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const body = req.body;
  try {
    const updatedComment = await commentService.updateComment(commentId, req.user, body);
    return res.status(200).send({ status: "success", message: "Comment updated", data: updatedComment });
  } catch (error) {
    next(error);
  }
};
