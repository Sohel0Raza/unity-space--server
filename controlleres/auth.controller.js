import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/schemes.model.js";

const currentTimeStamp = new Date().getTime() / 1000;
const otpExpiryTime = currentTimeStamp + 60 * 5;

export const signup = async (req, res) => {
  try {
    const newUser = req.body;

    const userDoc = new userModel({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneOrEmail: newUser.phoneOrEmail,
      gender: newUser.gender,
      otp: newUser.otp,
      otpExpiryTime,
    });

    console.log("✌️userDoc --->", userDoc);
    await userDoc.hashPassword(newUser.password);

    const result = await userDoc.save();
    console.log("✌️result --->", result);

    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const otpVerify = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(204).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp != otp) {
      return res.status(200).send({
        success: false,
        message: "Otp not match",
      });
    }

    if (user.otpExpiryTime < currentTimeStamp) {
      return res.status(200).send({
        success: false,
        message: "Otp expried!",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      $set: { isVerify: true },
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.EXPIRY_TIME, subject: "sohel" }
    );
    
    res.status(200).send({ success: true, token });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { userId, newOtp } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(204).send({
        success: false,
        message: "User not found",
      });
    }

    const result = await userModel.findByIdAndUpdate(userId, {
      $set: { otp: newOtp, otpExpiryTime },
    });

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

    const user = await userModel.findOne({
      phoneOrEmail: loginReqest.phoneOrEmail,
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

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
