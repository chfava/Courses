import { Module } from "@nestjs/common";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ClinicModule } from "./modules/clinic/clinic.module";
import { ExamResultModule } from "./modules/exam-result/exam-result.module";
import { FormResultModule } from "./modules/form-result/form-result.module";
import { FormTemplateModule } from "./modules/form-template/form-template.module";
import { MedicalExamModule } from "./modules/medical-exam/medical-exam.module";
import { PatientModule } from "./modules/patient/patient.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { RoleModule } from "./modules/role/role.module";
import { SecretaryModule } from "./modules/secretary/secretary.module";
import { UserModule } from "./modules/user/user.module";
import { AIModule } from "./modules/ai/ai.module";

@Module({
  imports: [
    AdminModule,
    AIModule,
    AuthModule,
    ClinicModule,
    ExamResultModule,
    FormResultModule,
    FormTemplateModule,
    MedicalExamModule,
    PatientModule,
    PermissionModule,
    RoleModule,
    SecretaryModule,
    UserModule
  ]
})
export class AppModule {}
