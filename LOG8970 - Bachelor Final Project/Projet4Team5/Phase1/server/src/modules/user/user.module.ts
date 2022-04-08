import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AdminModule } from "../admin/admin.module";
import { PracticianModule } from "../practician/practician.module";
import { RoleModule } from "../role/role.module";
import { SecretaryModule } from "../secretary/secretary.module";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AdminModule),
    forwardRef(() => PracticianModule),
    forwardRef(() => SecretaryModule),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService]
})
export class UserModule {}
