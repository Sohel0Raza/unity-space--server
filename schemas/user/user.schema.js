import bcrypt from "bcrypt";
import { Schema } from "mongoose";

export const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneOrEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true }, // will enum value fixed male or female
  otp: { type: Number}, 
  otpExpiryTime: { type: Number }, 
  isVerify: { type: Boolean, default: false }, 
});

userSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};
