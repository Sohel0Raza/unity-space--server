import mongoose from "mongoose";
import { userSchema } from "../schemas/user/user.schema.js";
import { commentReplaySchema } from "../schemas/post/comment.reaplay.schema.js";
import { postCommentSchema } from "../schemas/post/post.comment.schema.js";
import { postPhotoSchema } from "../schemas/post/post.photo.schema.js";
import { postReactSchema } from "../schemas/post/post.react.schema.js";
import { postSchema } from "../schemas/post/post.schema.js";
import { postShareSchema } from "../schemas/post/post.share.schema.js";
import { storyReactSchema } from "../schemas/story/story.react.schema.js";
import { storySchema } from "../schemas/story/story.schema.js";

const userModel = mongoose.model("user", userSchema);
const postModel = mongoose.model("post", postSchema);
const postPhotoModel = mongoose.model("postPhoto", postPhotoSchema);
const postReactModel = mongoose.model("postReact", postReactSchema);
const postCommentModel = mongoose.model("postComment", postCommentSchema);
const commentReplayModel = mongoose.model("commentReplay", commentReplaySchema);
const postShareModel = mongoose.model("postShare", postShareSchema);
const storyModel = mongoose.model("story", storySchema);
const storyReactModel = mongoose.model("storyReact", storyReactSchema);

export {
  userModel,
  postModel,
  postPhotoModel,
  postReactModel,
  postCommentModel,
  commentReplayModel,
  postShareModel,
  storyModel,
  storyReactModel,
};
