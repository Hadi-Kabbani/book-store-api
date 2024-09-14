const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");
const authenticate = require("../middlewares/authenticate");

commentRouter.post("/", authenticate, commentController.createComment);
commentRouter.get("/", commentController.getAllCommentsWithUser);
commentRouter.get("/:commentId", authenticate, commentController.getCommentById);
commentRouter.delete("/:commentId", authenticate, commentController.deleteComment);
commentRouter.patch("/:commentId", authenticate, commentController.updateComment);

module.exports = commentRouter;
