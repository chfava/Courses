import * as mongoose from "mongoose";

export const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
});
