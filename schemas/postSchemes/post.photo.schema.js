import { Schema } from "mongoose";

export const postPhotoSchema = new Schema({
    url: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "post" },
  });