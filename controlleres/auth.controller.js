import bcrypt from "bcrypt";
import { userModel } from "../models/schemes.model.js";

export const signup = async (req, res) => {
  try {
    const newUser = req.body;

    const userDoc = new userModel({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneOrEmail: newUser.phoneOrEmail,
      gender: newUser.gender,
    });

    await userDoc.hashPassword(newUser.password);

    const result = await userDoc.save();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const loginReqest = req.body;

    const user = await userModel.findOne({
      phoneOrEmail: loginReqest.phoneOrEmail,
    });

    if (!user)
      return res.status(204).send({
        message: "User not found",
      });

    const success = bcrypt.compareSync(loginReqest.password, user.password);

    res.status(200).send({ success, token:  });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
