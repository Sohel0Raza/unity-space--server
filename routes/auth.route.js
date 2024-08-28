import express from "express";
import { signup } from "../controlleres/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
// authRouter.post("/login", signup);