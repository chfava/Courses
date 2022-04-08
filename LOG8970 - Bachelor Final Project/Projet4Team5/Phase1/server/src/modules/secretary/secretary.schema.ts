import * as mongoose from "mongoose";

export const secretarySchema = new mongoose.Schema(
  {
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateModified"
    }
  }
);
