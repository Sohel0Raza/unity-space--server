import express from "express"
import { createComment, getAllComment } from "../../controlleres/commentsControlleres/comment.controller.js"

export const commentRouter = express.Router()

commentRouter.get("/", getAllComment)
commentRouter.post("/", createComment)