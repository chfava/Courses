import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  Inject,
  forwardRef,
  ConflictException
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from "jsonwebtoken";
import { Authorization } from "../../decorators/authorization.decorator";
import { Permissions } from "../../decorators/permissions.decorator";
import { CheckLoggedInGuard } from "../../guards/check-logged-in.guard";
import { User } from "../../decorators/user.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { MONGO_ERROR_CODE, MONGO_ERROR_NAME } from "../../utils/mongo.errors";
import { AdminService } from "../admin/admin.service";
import { PracticianService } from "../practician/practician.service";
import { RoleInterface } from "../role/role.interface";
import { SecretaryService } from "../secretary/secretary.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateOtherPasswordDto } from "./dto/update-other-password.dto";
import { UpdateSelfPasswordDto } from "./dto/update-self-password.dto";
import { UserInterface } from "./user.interface";
import { UserService } from "./user.service";

@Controller("users")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class UserController {
  constructor(
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
    @Inject(forwardRef(() => PracticianService))
    private readonly practicianService: PracticianService,
    @Inject(forwardRef(() => SecretaryService))
    private readonly secretaryService: SecretaryService,
    private readonly userService: UserService
  ) {}

  @Post()
  @Permissions("meditrinae-api:users:create")
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (err) {
      if (err && err.name === MONGO_ERROR_NAME && err.code === MONGO_ERROR_CODE.DUPLICATE_KEY) {
        throw new ConflictException({ userAlreadyExists: true });
      }
      throw err;
    }
  }

  @Get()
  @Permissions("meditrinae-api:users:get")
  public async getAllUsers() {
    return this.userService.find();
  }

  @Get(":id")
  @Permissions("meditrinae-api:users:get")
  public async getUserById(@Param("id") userId: string) {
    return this.userService.findById(userId);
  }

  @Put("password")
  @Permissions("meditrinae-api:users:update-password-self")
  public async updateSelfPassword(@Body() updateSelfPasswordDto: UpdateSelfPasswordDto) {
    return this.userService.updateSelfPassword(updateSelfPasswordDto.id, updateSelfPasswordDto);
  }

  @Put("password/:id")
  @Permissions("meditrinae-api:users:update-password-other")
  public async updateUserPassword(
    @Authorization() authorization: string,
    @Param("id") otherUserId: string,
    @Body() updateOtherPasswordDto: UpdateOtherPasswordDto
  ) {
    const jwtPayload: any = jwt.decode(authorization.replace("Bearer ", ""));
    if (jwtPayload.user.role.name === "super-admin") {
      return this.userService.updateUserPassword(otherUserId, updateOtherPasswordDto.newPassword, true);
    }

    // If as admin we should check that the updated user belongs to the same clinic as the admin.
    const otherUser = await this.userService.findById(otherUserId, { path: "role" });

    if (!otherUser) {
      throw new NotFoundException();
    }

    const otherUserRoleName = (otherUser.role as RoleInterface).name;
    let otherUserClinicId;
    switch (otherUserRoleName) {
      case "practician":
        const practician = await this.practicianService.findOne({ user: otherUserId });
        otherUserClinicId = practician.clinic;
        break;
      case "secretary":
        const secretary = await this.secretaryService.findOne({ user: otherUserId });
        otherUserClinicId = secretary.clinic;
        break;
      case "admin":
        const admin = await this.adminService.findOne({ user: otherUserId });
        otherUserClinicId = admin.clinic;
        break;
    }

    if (jwtPayload.admin.clinic !== otherUserClinicId.toHexString()) {
      throw new ForbiddenException();
    }

    return this.userService.updateUserPassword(otherUserId, updateOtherPasswordDto.newPassword, true);
  }

  @Delete(":id")
  @UseGuards(CheckLoggedInGuard)
  @Permissions("meditrinae-api:users:delete")
  public deleteUser(@Param("id") userId: string) {
    return this.userService.delete(userId);
  }
}
