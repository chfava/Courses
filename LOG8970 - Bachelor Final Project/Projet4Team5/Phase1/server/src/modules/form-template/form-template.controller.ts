import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { formsData } from "../../data/forms";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { FormTemplateService } from "./form-template.service";

@Controller("forms-templates")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class FormTemplateController {
  constructor(private readonly formTemplateService: FormTemplateService) {}

  @Post("populate")
  @Permissions("meditrinae-api:forms-templates:create")
  public async populateRolesAndPermissions() {
    return this.formTemplateService.populateFormTemplates(formsData);
  }

  @Get()
  @Permissions("meditrinae-api:forms-templates:get")
  public async getAllFormsTemplates() {
    return this.formTemplateService.find();
  }

  @Get(":id")
  @Permissions("meditrinae-api:forms-templates:get")
  public async getFormTemplateById(@Param("id") formTemplateId: string) {
    return this.formTemplateService.findById(formTemplateId);
  }
}
