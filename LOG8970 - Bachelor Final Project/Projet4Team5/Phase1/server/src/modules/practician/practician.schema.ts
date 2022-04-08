import * as mongoose from "mongoose";

export const practicianSchema = new mongoose.Schema(
  {
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    dateDeleted: mongoose.Schema.Types.Date,
    firstName: String,
    lastName: String,
    phone: String,
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
