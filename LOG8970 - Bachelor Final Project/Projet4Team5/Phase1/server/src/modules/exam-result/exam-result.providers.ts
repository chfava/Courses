import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { examResultSchema } from "./exam-result.schema";
import { patientSchema } from "../patient/patient.schema";
import { medicalExamSchema } from "../medical-exam/medical-exam.schema";

export const examResultProviders: FactoryProvider[] = [
  {
    provide: "ExamResultModelToken",
    useFactory: (connection: Connection) => connection.model("ExamResult", examResultSchema),
    inject: ["DbConnectionToken"]
  },
  
  {
    provide: "PatientModelToken",
    useFactory: (connection: Connection) => connection.model("Patient", patientSchema),
    inject: ["DbConnectionToken"]
  },
  
  {
    provide: "MedicalExamModelToken",
    useFactory: (connection: Connection) => connection.model("MedicalExam", medicalExamSchema),
    inject: ["DbConnectionToken"]
  }
];
