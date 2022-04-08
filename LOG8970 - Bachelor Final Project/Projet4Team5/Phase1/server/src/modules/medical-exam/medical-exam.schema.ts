import * as mongoose from "mongoose";

export const medicalExamSchema = new mongoose.Schema(
  {
    diagnosis: Object,
    formsResults: [{ type: mongoose.Schema.Types.ObjectId, ref: "FormResult" }],
    examResultID: { type: mongoose.Schema.Types.ObjectId, ref: "ExamResult" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    practician: { type: mongoose.Schema.Types.ObjectId, ref: "Practician" },
    treatment: Object
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateModified"
    }
  }
);
