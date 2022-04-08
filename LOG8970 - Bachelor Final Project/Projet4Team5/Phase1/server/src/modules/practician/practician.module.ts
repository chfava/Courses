import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { PracticianController } from "./practician.controller";
import { practicianProviders } from "./practician.providers";
import { PracticianService } from "./practician.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [PracticianController],
  providers: [...practicianProviders, PracticianService],
  exports: [...practicianProviders, PracticianService]
})
export class PracticianModule {}
