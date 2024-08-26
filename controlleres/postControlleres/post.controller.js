import { postModel, postPhotoModel } from "../../modeles/schemes.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;

    const savedPhotos = await postPhotoModel.insertMany(newPost.photos);
    const savedPhotoIds = savedPhotos.map((photo) => photo._id);

    const postDoc = new postModel({
      desciption: newPost.desciption,
      photos: savedPhotoIds,
    });

    const result = await postDoc.save();

    await postPhotoModel.updateMany(
      { _id: savedPhotoIds },
      { post: result._id }
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req?.params?.id;
    const option = { upsert: true, returnDocument: "after" };
    const post = req.body;

    await postPhotoModel.deleteMany({ post: id });

    const updatedPhotos = await postPhotoModel.insertMany(post.photos);
    const updatedPhotoIds = updatedPhotos.map((photo) => photo._id);

    const updatedPostDoc = {
      $set: {
        desciption: post.desciption,
        photos: updatedPhotoIds,
      },
    };

    const result = await postModel.findByIdAndUpdate(
      id,
      updatedPostDoc,
      option
    );

    await postPhotoModel.updateMany(
      { _id: updatedPhotoIds },
      { post: result._id }
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await postModel.findByIdAndDelete(id).populate("photos");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

