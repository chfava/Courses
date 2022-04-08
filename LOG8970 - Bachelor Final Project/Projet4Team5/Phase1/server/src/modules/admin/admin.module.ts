import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { AdminController } from "./admin.controller";
import { adminProviders } from "./admin.providers";
import { AdminService } from "./admin.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [AdminController],
  providers: [AdminService, ...adminProviders],
  exports: [AdminService]
})
export class AdminModule {}
