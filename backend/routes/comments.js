const express = require("express");
const {
  createNewComment,
  getCommentByProductId,
} = require("../controllers/comments");

const auth = require("../middleware/authentication");

const commentRouter = express.Router();

commentRouter.post("/:id", auth, createNewComment);
commentRouter.get("/product_id/:id", getCommentByProductId);

module.exports = commentRouter;
