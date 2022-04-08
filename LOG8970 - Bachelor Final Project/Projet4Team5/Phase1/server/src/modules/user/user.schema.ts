import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  firstLogIn: { type: Boolean, default: true },
  password: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  username: { type: String, unique: true }
});
