import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { CheckLoggedInGuard } from "../../guards/check-logged-in.guard";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { FilterPatientsForClinic } from "./dto/filter-patients-for-clinic";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { PatientService } from "./patient.service";

@Controller("patients")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @Permissions("meditrinae-api:patients:get")
  public async getAllPatients() {
    return this.patientService.find();
  }

  @Get("count")
  @Permissions("meditrinae-api:patients:get")
  public async getAllPatientsCount() {
    return this.patientService.count();
  }

  @Get("clinics/:clinicId")
  @Permissions("meditrinae-api:patients:get")
  public async getPatiendsByClinic(@Param("clinicId") clinicId: string) {
    return this.patientService.findByClinic(clinicId);
  }

  @Get("info/:email")
  @Permissions("meditrinae-api:patients:get")
  public async getInfoByEmail(@Param("email") email: string) {
    return this.patientService.sendInfo(email);
  }

  @Get("clinics/:clinicId/count")
  @Permissions("meditrinae-api:patients:get")
  public async getPatientsCountByClinic(@Param("clinicId") clinicId: string) {
    return this.patientService.count({ clinic: clinicId });
  }

  @Get("active/:id")
  @Permissions("meditrinae-api:patients:get")
  public async getAllActivePatientsForClinic(@Param("id") clinicId: string) {
    return this.patientService.findAllActivePatientsForClinic(clinicId);
  }

  @Get(":id/medical-exams")
  @Permissions("meditrinae-api:medical-exams:get")
  public async getAllMedicalExamsForPatientById(@Param("id") patientId: string) {
    const patientWithMedicalExams = await this.patientService.findById(patientId, ["medical-exams"]);
    return patientWithMedicalExams.medicalExams;
  } 

  @Get(":id/medical-exams/recent")
  @Permissions("meditrinae-api:medical-exams:get")
  public async getRecentMedicalExamForPatientById(@Param("id") patientId: string) {
    const patientWithMedicalExams = await this.patientService.findById(patientId, ["medical-exams"]);
    return patientWithMedicalExams.medicalExams.sort((a, b) => { return b.dateCreated - a.dateCreated})[0];
  } 

  @Get(":id")
  @Permissions("meditrinae-api:patients:get")
  public async getPatientById(@Param("id") patientId: string) {
    return this.patientService.findById(patientId);
  }

  @Post()
  @Permissions("meditrinae-api:patients:create")
  public async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post("filter")
  @Permissions("meditrinae-api:patients:get")
  public async filterPatientsForClinic(@Body() filterPatientsForClinic: FilterPatientsForClinic) {
    return this.patientService.find(filterPatientsForClinic);
  }

  @Delete(":id")
  @UseGuards(CheckLoggedInGuard)
  @Permissions("meditrinae-api:patients:delete")
  public async deletePatient(@Param("id") patientId: string) {
    return this.patientService.delete(patientId);
  }

  @Put()
  @Permissions("meditrinae-api:patients:update")
  public async updatePatient(@Body() updatePatient: UpdatePatientDto) {
    return this.patientService.update(updatePatient);
  }
}
