import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PermissionController } from "./permission.controller";
import { permissionProviders } from "./permission.providers";
import { PermissionService } from "./permission.service";

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [...permissionProviders, PermissionService],
  exports: [...permissionProviders, PermissionService]
})
export class PermissionModule {}
