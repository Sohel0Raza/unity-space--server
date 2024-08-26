import { Schema } from "mongoose";

export const postShareSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  });