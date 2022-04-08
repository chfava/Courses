import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PermissionService } from "./permission.service";

@Controller("permissions")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Permissions("meditrinae-api:permissions:create")
  public async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Put(":id")
  @Permissions("meditrinae-api:permissions:update")
  public async updatePermission(@Param("id") permissionId: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(permissionId, updatePermissionDto);
  }
}
