import { Schema } from "mongoose";

export const commentReplaySchema = new Schema({
    desciption: { type: String, required: true },
    comment: { type: Schema.Types.ObjectId, ref: "comment" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  });