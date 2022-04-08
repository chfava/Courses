import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { patientSchema } from "./patient.schema";
import { examResultSchema } from "../exam-result/exam-result.schema";
import { medicalExamSchema } from "../medical-exam/medical-exam.schema";

export const patientProviders: FactoryProvider[] = [
  {
    provide: "PatientModelToken",
    useFactory: (connection: Connection) => connection.model("Patient", patientSchema),
    inject: ["DbConnectionToken"]
  },
  {
    provide: "ExamResultModelToken",
    useFactory: (connection: Connection) => connection.model("ExamResult", examResultSchema),
    inject: ["DbConnectionToken"]
  },
  {
    provide: "MedicalExamModelToken",
    useFactory: (connection: Connection) => connection.model("MedicalExam", medicalExamSchema),
    inject: ["DbConnectionToken"]
  }
];
