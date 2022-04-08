import * as mongoose from "mongoose";

export const adminSchema = new mongoose.Schema(
  {
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    firstName: String,
    lastName: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateModified"
    }
  }
);
