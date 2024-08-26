import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../controlleres/postControlleres/post.controller.js";

export const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
