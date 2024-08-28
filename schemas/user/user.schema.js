import bcrypt from "bcrypt";
import { Schema } from "mongoose";

export const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneOrEmail: { type: String, required: true, unique:true }, //need validation also unique
    password: { type: String, required: true, select: false},
    gender: { type: String, required: true }, // will enum value fixed male or female
  });

  userSchema.methods.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  };