import mongoose from "mongoose";
import { commentReplaySchema } from "../schemas/postSchemes/comment.reaplay.schema.js";
import { postCommentSchema } from "../schemas/postSchemes/post.comment.schema.js";
import { postPhotoSchema } from "../schemas/postSchemes/post.photo.schema.js";
import { postReactSchema } from "../schemas/postSchemes/post.react.schema.js";
import { postSchema } from "../schemas/postSchemes/post.schema.js";
import { postShareSchema } from "../schemas/postSchemes/post.share.schema.js";
import { storyReactSchema } from "../schemas/storySchema/story.react.schema.js";
import { storySchema } from "../schemas/storySchema/story.schema.js";

// const userModel = mongoose.model("user", userSchema);
const postModel = mongoose.model("post", postSchema);
const postPhotoModel = mongoose.model("postPhoto", postPhotoSchema);
const postReactModel = mongoose.model("postReact", postReactSchema);
const postCommentModel = mongoose.model("postComment", postCommentSchema);
const commentReplayModel = mongoose.model("commentReplay", commentReplaySchema);
const postShareModel = mongoose.model("postShare", postShareSchema);
const storyModel = mongoose.model("story", storySchema);
const storyReactModel = mongoose.model("storyReact", storyReactSchema);

export {
  postModel,
  postPhotoModel,
  postReactModel,
  postCommentModel,
  commentReplayModel,
  postShareModel,
  storyModel,
  storyReactModel,
};
