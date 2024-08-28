import { Schema } from "mongoose";

export const storyReactSchema = new Schema({
    type: { type: Schema.Types.ObjectId, ref: "reactType" },
    post: { type: Schema.Types.ObjectId, ref: "post" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  });
