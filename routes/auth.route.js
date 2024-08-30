import express from "express";
import { login, otpVerify, resendOtp, signup } from "../controlleres/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/otpVerify", otpVerify);
authRouter.post("/resendOtp", resendOtp);