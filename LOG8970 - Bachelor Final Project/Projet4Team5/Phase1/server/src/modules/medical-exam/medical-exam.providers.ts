import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { medicalExamSchema } from "./medical-exam.schema";

export const medicalExamProviders: FactoryProvider[] = [
  {
    provide: "MedicalExamModelToken",
    useFactory: (connection: Connection) => connection.model("MedicalExam", medicalExamSchema),
    inject: ["DbConnectionToken"]
  }
];
