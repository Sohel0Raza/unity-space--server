import { Schema } from "mongoose";

export const postSchema = new Schema({
  description: { type: String, required: true },
  photos: [{ type: Schema.Types.ObjectId, ref: "postPhoto" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "postLike" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "postComment" }],
  shares: [{ type: Schema.Types.ObjectId, ref: "postShare" }],
  user: { type: Schema.Types.ObjectId, ref: "user" },
});
