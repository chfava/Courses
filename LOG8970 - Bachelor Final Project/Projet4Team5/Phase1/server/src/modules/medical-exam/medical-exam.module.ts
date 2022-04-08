import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ExamResultModule } from "../exam-result/exam-result.module";
import { FormResultModule } from "../form-result/form-result.module";
import { PatientModule } from "../patient/patient.module";
import { MedicalExamController } from "./medical-exam.controller";
import { medicalExamProviders } from "./medical-exam.providers";
import { examResultProviders } from "../exam-result/exam-result.providers";
import { MedicalExamService } from "./medical-exam.service";
import { ExamResultService } from "../exam-result/exam-result.service";

@Module({
  imports: [DatabaseModule, ExamResultModule, FormResultModule, PatientModule],
  controllers: [MedicalExamController],
  providers: [MedicalExamService, ...medicalExamProviders, ExamResultService, ...examResultProviders],
  exports: [MedicalExamService]
})
export class MedicalExamModule {}
