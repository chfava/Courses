import { Document } from "mongoose";
import { ClinicInterface } from "../clinic/clinic.interface";
import { MedicalExamInterface } from "../medical-exam/medical-exam.interface";

export interface PatientInterface extends Document {
  address: string;
  clinic: string | ClinicInterface;
  dateCreated: Date;
  dateModified: Date;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  medicalExams: string[] | MedicalExamInterface[];
  notes: object;
  diagnostic: object;
  treatment: object;
  diagnostic_practician: object;
  treatmentc_practician: object;
  scores?: {
    OBC?: number;
    PHQ4?: number;
    PHQ9?: number;
    MAN8?: number;
    MORPHO?: number;
    GAD7?: number;
    GCPS?: number
  }
}
