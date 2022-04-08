import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleController } from "./role.controller";
import { roleProviders } from "./role.providers";
import { examResultProviders } from "../exam-result/exam-result.providers";
import { RoleService } from "./role.service";
import { ExamResultService } from "../exam-result/exam-result.service";

@Module({
  imports: [DatabaseModule, PermissionModule],
  controllers: [RoleController],
  providers: [...roleProviders, RoleService, ...examResultProviders, ExamResultService],
  exports: [RoleService, ExamResultService]
})
export class RoleModule {}
