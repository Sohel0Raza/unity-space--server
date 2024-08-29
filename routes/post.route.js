import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controlleres/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const postRouter = express.Router();

postRouter.get("/", verifyToken, getPosts);
postRouter.post("/",verifyToken, createPost);
postRouter.put("/:id",verifyToken, updatePost);
postRouter.delete("/:id",verifyToken, deletePost);
