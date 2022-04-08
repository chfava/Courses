import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PracticianModule } from "../practician/practician.module";
import { SecretaryModule } from "../secretary/secretary.module";
import { AdminModule } from "../admin/admin.module";
import { ClinicController } from "./clinic.controller";
import { clinicProviders } from "./clinic.providers";
import { ClinicService } from "./clinic.service";

@Module({
  imports: [DatabaseModule, PracticianModule, SecretaryModule, AdminModule],
  controllers: [ClinicController],
  providers: [ClinicService, ...clinicProviders],
  exports: [ClinicService]
})
export class ClinicModule {}
