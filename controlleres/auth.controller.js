import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const loginReqest = req.body;
    console.log("✌️loginReqest --->", loginReqest);

    const user = await userModel.findOne({
      phoneOrEmail: loginReqest.phoneOrEmail,
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    console.log("✌️user --->", user);
    const passwordMatch = bcrypt.compareSync(
      loginReqest.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.EXPIRY_TIME, subject: "sohel" }
    );

    res.status(200).send({ success: passwordMatch, token });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
