import { Module, HttpModule } from "@nestjs/common";
import { AIController } from "./ai.controller";
import { AIService } from "./ai.service";
import { MedicalExamModule } from "../medical-exam/medical-exam.module";
import { FormTemplateModule } from "../form-template/form-template.module";

@Module({
  imports: [MedicalExamModule, HttpModule, FormTemplateModule],
  controllers: [AIController],
  providers: [AIService],
  exports: [AIService]
})
export class AIModule {}
