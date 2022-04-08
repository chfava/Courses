import * as mongoose from "mongoose";

export const patientSchema = new mongoose.Schema(
  {
    address: String,
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    dateOfBirth: Date,
    email: String,
    firstName: String,
    gender: String,
    lastName: String,
    medicalExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalExam" }],
    notes: Object,
    diagnostic: Object,
    treatment: Object,
    diagnostic_practician: Object,
    treatmentc_practician: Object,
    scores: {
      OBC: Number,
      PHQ4: Number,
      PHQ9: Number,
      MAN8: Number,
      MORPHO: Number,
      GAD7: Number,
      GCPS: Number
    }
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateModified"
    }
  }
);
