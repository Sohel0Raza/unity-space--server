import { postCommentModel, postModel } from "../../modeles/schemes.model.js";

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
      desciption: newComment.desciption,
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
