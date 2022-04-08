import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { PracticianService } from "../practician/practician.service";
import { SecretaryService } from "../secretary/secretary.service";
import { AdminService } from "../admin/admin.service";
import { ClinicService } from "./clinic.service";
import { CreateClinicDto } from "./dto/create-clinic.dto";
import { UpdateClinicDto } from "./dto/update-clinic.dto";

@Controller("clinics")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class ClinicController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly practicianService: PracticianService,
    private readonly adminService: AdminService,
    private readonly secretaryService: SecretaryService
  ) {}

  @Post()
  @Permissions("meditrinae-api:clinic:create")
  public async createClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Get(":id")
  @Permissions("meditrinae-api:clinic:get")
  public async getClinicById(@Param("id") clinicId: string) {
    return this.clinicService.findById(clinicId);
  }

  @Get(":id/secretaries")
  @Permissions("meditrinae-api:secretaries:get")
  public async getAllClinicSecretaries(@Param("id") clinicId: string) {
    return this.secretaryService.find({ clinic: clinicId });
  }

  @Get(":id/practicians")
  @Permissions("meditrinae-api:practicians:get")
  public async getAllClinicPracticians(@Param("id") clinicId: string) {
    return this.practicianService.find({ clinic: clinicId });
  }

  @Get(":id/admins")
  @Permissions("meditrinae-api:practicians:get")
  public async getAllClinicAdmins(@Param("id") clinicId: string) {
    return this.adminService.find({ clinic: clinicId });
  }

  @Get()
  @Permissions("meditrinae-api:clinic:get")
  public async getAllClinics() {
    return this.clinicService.find();
  }

  @Put()
  @Permissions("meditrinae-api:clinic:update")
  public async updateClinic(@Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(updateClinicDto);
  }
}
