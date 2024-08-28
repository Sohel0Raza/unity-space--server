import { Schema } from "mongoose";

export const postCommentSchema = new Schema({
    desciption: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "post" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    replies: [{ type: Schema.Types.ObjectId, ref: "commentReplay" }],
  });