import express from "express";
import multer from "multer";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controlleres/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const postRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


postRouter.get("/", getPosts);
postRouter.post("/", upload.array('photos'), createPost);
postRouter.put("/:id",verifyToken, updatePost);
postRouter.delete("/:id",verifyToken, deletePost);
