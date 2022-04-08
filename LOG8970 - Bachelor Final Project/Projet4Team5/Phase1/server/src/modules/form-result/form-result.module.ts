import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { FormResultController } from "./form-result.controller";
import { formResultProviders } from "./form-result.providers";
import { FormResultService } from "./form-result.service";

@Module({
  imports: [DatabaseModule],
  controllers: [FormResultController],
  providers: [FormResultService, ...formResultProviders],
  exports: [FormResultService, ...formResultProviders]
})
export class FormResultModule {}
