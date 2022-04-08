import { Document } from "mongoose";
import { FormResultInterface } from "../form-result/form-result.interface";
import { PatientInterface } from "../patient/patient.interface";
import { ExamResultInterface } from "../exam-result/exam-result.interface";

export interface MedicalExamInterface extends Document {
  dateCreated: Date;
  dateModified: Date;
  diagnosis: object;
  formsResults: string[] | FormResultInterface[];
  examResultID: string;
  patient: string | PatientInterface;
  practician: string;
  treatment: object;
}
