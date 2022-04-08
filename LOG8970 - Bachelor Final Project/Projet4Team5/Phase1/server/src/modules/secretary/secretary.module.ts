import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { SecretaryController } from "./secretary.controller";
import { secretaryProviders } from "./secretary.providers";
import { SecretaryService } from "./secretary.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [SecretaryController],
  providers: [SecretaryService, ...secretaryProviders],
  exports: [SecretaryService]
})
export class SecretaryModule {}
