import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as fs from "fs";
import { AdminModule } from "../admin/admin.module";
import { PracticianModule } from "../practician/practician.module";
import { SecretaryModule } from "../secretary/secretary.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      secretOrPrivateKey: fs.readFileSync(process.cwd() + "/key/private.key", "utf8")
    }),
    PracticianModule,
    SecretaryModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
