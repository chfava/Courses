import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { PracticianService } from "../practician/practician.service";
import { RoleInterface } from "../role/role.interface";
import { SecretaryService } from "../secretary/secretary.service";
import { UserService } from "../user/user.service";
import { CreateTokenDto } from "./dto/create-token.dto";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly practicianService: PracticianService,
    private readonly secretaryService: SecretaryService,
    private readonly usersService: UserService
  ) {}

  async createToken(createTokenDto: CreateTokenDto) {
    const user = await this.usersService.login(createTokenDto);

    // Remove sensitive/unnecessary information.
    user.password = undefined;
    (user.role as RoleInterface).permissions = undefined;

    const payload: JwtPayload = { user };

    // Data of the user's owner.
    const role = (user.role as RoleInterface).name;
    switch (role) {
      case "admin":
        payload.admin = await this.adminService.findOne({ user: user.id });
        break;
      case "practician":
        payload.practician = await this.practicianService.findOne({ user: user.id });
        break;
      case "secretary":
        payload.secretary = await this.secretaryService.findOne({ user: user.id });
        break;
    }

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      firstLogIn: user.firstLogIn
    };
  }

  async validateUser(payload: JwtPayload) {
    return await this.usersService.findById(payload.user["_id"], {
      path: "role",
      populate: {
        path: "permissions"
      }
    });
  }
}
