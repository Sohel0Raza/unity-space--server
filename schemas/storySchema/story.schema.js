import { Schema } from "mongoose";

export const storySchema = new Schema({
    url: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  });
