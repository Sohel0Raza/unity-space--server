import express from "express";
import {
  getUser,
  getUserById,
  login,
  otpVerify,
  resendOtp,
  sendOtpOnMail,
  signup,
} from "../controlleres/auth.controller.js";

export const authRouter = express.Router();

authRouter.get("/users", getUser);
authRouter.get("/users/:id", getUserById);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/otpVerify", otpVerify);
authRouter.post("/resendOtp", resendOtp);
authRouter.post("/sendOtpOnMail", sendOtpOnMail);
