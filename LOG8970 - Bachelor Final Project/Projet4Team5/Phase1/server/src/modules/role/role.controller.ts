import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { rolesData } from "../../data/roles";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { RoleService } from "./role.service";
import { ExamResultService } from "../exam-result/exam-result.service";

@Controller("roles")
@UseGuards()
export class RoleController {
  constructor(private readonly roleService: RoleService,
              private readonly examResultService: ExamResultService) {}

  @Post("populate")
  @Permissions("meditrinae-api:roles:create")
  public async populateRolesAndPermissions() {
    return this.roleService.populateRolesAndPermissions(rolesData);
  }

  
  @Get("people-completed")
  async getPeopleCompleted() {
    return this.examResultService.findCompleted();
  }
}
