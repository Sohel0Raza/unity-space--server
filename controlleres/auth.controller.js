import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Mailjet from "node-mailjet";
import { userModel } from "../models/schemes.model.js";

const currentTimeStamp = new Date().getTime() / 1000;
const otpExpiryTime = currentTimeStamp + 60 * 5;

export const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const newUser = req.bdy;

    const userDoc = new userModel({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneOrEmail: newUser.phoneOrEmail,
      gender: newUser.gender,
      otp: newUser.otp,
      otpExpiryTime: newUser.otpExpiryTime,
    });

    await userDoc.hashPassword(newUser.password);

    const result = await userDoc.save();

    res.status(200).send({ success: true, result });
  } catch (error) {
    // Check if the error is a duplicate key error
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(400).send({
        success: false,
        message: "The phone or email already exists.",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "An internal server error occurred.",
      });
    }
  }
};

export const otpVerify = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found. Please check the user ID and try again.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Please enter the correct OTP sent to your phone or email.",
      });
    }

    if (user.otpExpiryTime < Date.now()) {
      return res.status(400).send({
        success: false,
        message: "The OTP has expired. Please request a new one.",
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
      success: false,
      message: `An error occurred during OTP verification: ${error.message}`,
    });
  }
};

export const sendOtpOnMail = async (req, res) => {
  try {
    const { email } = req.body;

    const mailjet = Mailjet.apiConnect(
      "042366deaa3fe3753f23fe79170394dd",
      "e3bf2fa2fe9f9e72db293813b8cdca0a"
    );

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "soheldot1239@gmail.com",
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: "Unity Space- Please verify email for login",
          TextPart:
            "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    });

    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });

    res.status(200).send({ success: true });
  } catch (error) {
    console.log("✌️error --->", error);
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
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = bcrypt.compareSync(
      loginReqest.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
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
