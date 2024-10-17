import {
  commentReplayModel,
  postCommentModel,
  postModel,
} from "../models/schemes.model.js";

export const getAllComment = async (req, res) => {
  try {
    const comments = await postCommentModel.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = req.body;

    const commetnDoc = new postCommentModel({
      description: newComment.description,
      post: newComment.post,
      user: newComment.user,
    });

    const result = await commetnDoc.save();

    const post = await postModel
      .findOne({ _id: result.post })
      .populate({ path: "comments", select: "_id" });

    const commentIds = post.comments.map((comment) => comment._id);

    await postModel.findByIdAndUpdate(result.post, {
      comments: [...commentIds, result._id],
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//

export const getAllReplay = async (req, res) => {
  try {
    const replies = await commentReplayModel.find();

    res.status(200).send(replies);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const createReplay = async (req, res) => {
  try {
    const newReplay = req.body;

    const replayDoc = new commentReplayModel({
      description: newReplay.description,
      comment: newReplay.comment,
      user: newReplay.user,
    });
    const result = await replayDoc.save();

    const comment = await postCommentModel
      .findOne({ _id: result.comment })
      .populate({ path: "replies", select: "_id" });

    const replayIds = comment.replies.map((replay) => replay._id);

    await postCommentModel.findByIdAndUpdate(result.comment, {
      replies: [...replayIds, result._id],
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
