import express from "express";
import { login, signup } from "../controlleres/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);