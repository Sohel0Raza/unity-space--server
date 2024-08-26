import {
  commentReplayModel,
  postCommentModel,
} from "../../modeles/schemes.model.js";

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
      desciption: newReplay.desciption,
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
