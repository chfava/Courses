import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { FormTemplateController } from "./form-template.controller";
import { formTemplateProviders } from "./form-template.providers";
import { FormTemplateService } from "./form-template.service";
import { FilterPatientsForClinic } from "../patient/dto/filter-patients-for-clinic";

@Module({
  imports: [DatabaseModule],
  controllers: [FormTemplateController],
  providers: [FormTemplateService, ...formTemplateProviders],
  exports: [FormTemplateService]
})
export class FormTemplateModule {}
