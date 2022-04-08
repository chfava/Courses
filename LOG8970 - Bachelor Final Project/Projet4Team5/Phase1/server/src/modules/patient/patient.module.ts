import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { PatientController } from "./patient.controller";
import { patientProviders } from "./patient.providers";
import { PatientService } from "./patient.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [PatientController],
  providers: [PatientService, ...patientProviders],
  exports: [PatientService]
})
export class PatientModule {}
