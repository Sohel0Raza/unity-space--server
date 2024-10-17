import express from "express";
import {
  createComment,
  createReplay,
  getAllComment,
  getAllReplay,
} from "../controlleres/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


export const commentRouter = express.Router();

commentRouter.get("/", verifyToken, getAllComment);
commentRouter.post("/", verifyToken, createComment);

commentRouter.get("/replies", verifyToken, getAllReplay);
commentRouter.post("/replies", verifyToken, createReplay);
