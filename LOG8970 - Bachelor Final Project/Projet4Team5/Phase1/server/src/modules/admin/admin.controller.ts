import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { CheckLoggedInGuard } from "../../guards/check-logged-in.guard";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Controller("admins")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Permissions("meditrinae-api:admins:create")
  public createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Permissions("meditrinae-api:admins:get")
  public getAllAdmins() {
    return this.adminService.find();
  }

  @Get(":id")
  @Permissions("meditrinae-api:admins:get")
  public getAdminById(@Param("id") adminId: string) {
    return this.adminService.findById(adminId);
  }

  @Put()
  @Permissions("meditrinae-api:admins:update")
  public updateAdmin(@Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(updateAdminDto);
  }

  @Delete(":id")
  @UseGuards(CheckLoggedInGuard)
  @Permissions("meditrinae-api:admins:delete")
  public deleteAdminById(@Param("id") adminId: string) {
    return this.adminService.delete(adminId);
  }
}
