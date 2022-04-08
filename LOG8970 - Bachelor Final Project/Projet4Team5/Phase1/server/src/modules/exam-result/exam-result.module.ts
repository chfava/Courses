import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ExamResultController } from "./exam-result.controller";
import { examResultProviders } from "./exam-result.providers";
import { ExamResultService } from "./exam-result.service";
import { PatientModule } from "../patient/patient.module";

@Module({
  imports: [DatabaseModule, PatientModule],
  controllers: [ExamResultController],
  providers: [ExamResultService, ...examResultProviders],
  exports: [ExamResultService]
})
export class ExamResultModule {}
