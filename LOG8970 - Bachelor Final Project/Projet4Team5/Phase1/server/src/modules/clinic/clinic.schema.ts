import * as mongoose from "mongoose";

export const clinicSchema = new mongoose.Schema({
  address: String,
  email: String,
  name: String,
  phone: String
});
