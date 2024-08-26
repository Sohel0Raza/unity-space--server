import express from "express";
import {
  createReplay,
  getAllReplay,
} from "../../controlleres/commentsControlleres/comment.replay.controller.js";

export const replayRouter = express.Router();

replayRouter.get("/", getAllReplay);
replayRouter.post("/", createReplay);
