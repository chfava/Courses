import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreateFormResultDto } from "./dto/create-form-result.dto";
import { UpsertFormResultDto } from "./dto/upsert-form-result.dto";
import { FormResultService } from "./form-result.service";

@Controller("forms-results")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class FormResultController {
  constructor(private readonly formResultService: FormResultService) {}

  @Post()
  @Permissions("meditrinae-api:forms-results:create")
  async createFormResult(@Body() createFormResultDto: CreateFormResultDto) {
    return this.formResultService.create(createFormResultDto);
  }

  @Put()
  @Permissions("meditrinae-api:forms-results:update")
  async upsertFormsResults(@Body() upsertFormsResultsDto: UpsertFormResultDto[]) {
    return this.formResultService.upsertMany(upsertFormsResultsDto);
  }

  @Get(":id")
  @Permissions("meditrinae-api:forms-results:get")
  async getFormResultById(@Param("id") formId: string) {
    return this.formResultService.findById(formId);
  }

  @Get()
  @Permissions("meditrinae-api:forms-results:get")
  async getAllFormsResults() {
    return this.formResultService.find();
  }

  @Patch("script-migrate-form2-radio-checkbox")
  @Permissions("meditrinae:script")
  async scriptMigrateForm2RadioCheckbox() {
    return this.formResultService.scriptMigrateForm2RadioCheckbox();
  }

  @Patch("script-migrate-numerical-question")
  @Permissions("meditrinae-script")
  async scriptMigrateNumericalQuestion() {
    return this.formResultService.scriptMigrateNumericalQuestion();
  }
}
