import express from "express";
import {
  createComment,
  createReplay,
  getAllComment,
  getAllReplay,
} from "../../controlleres/commentsControlleres/comment.controller.js";

export const commentRouter = express.Router();

commentRouter.get("/", getAllComment);
commentRouter.post("/", createComment);

commentRouter.get("/replies", getAllReplay);
commentRouter.post("/replies", createReplay);
