import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreateMedicalExamDto } from "./dto/create-medical-exam.dto";
import { UpdateMedicalExamDto } from "./dto/update-medical-exam.dto";
import { MedicalExamService } from "./medical-exam.service";

@Controller("medical-exams")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class MedicalExamController {
  constructor(private readonly medicalExamService: MedicalExamService) {}

  @Post()
  @Permissions("meditrinae-api:medical-exams:create")
  public async createMedicalExam(@Body() createMedicalExamDto: CreateMedicalExamDto) {
    return this.medicalExamService.create(createMedicalExamDto);
  }

  @Put()
  @Permissions("meditrinae-api:medical-exams:update")
  public async updateMedicalExam(@Body() updateMedicalExamDto: UpdateMedicalExamDto) {
    return this.medicalExamService.update(updateMedicalExamDto);
  }

  @Get(":id")
  @Permissions("meditrinae-api:medical-exams:get")
  public async getMedicalExamById(@Param("id") medicalExamId: string) {
    return this.medicalExamService.findById(medicalExamId);
  }

  @Get(":id/exam-results")
  @Permissions("meditrinae-api:medical-exams:get", "meditrinae-api:exam-results:get")
  public async getAllExamResultsForMedicalExamId(@Param("id") medicalExamId: string) {
    const medicalExamWithExamResults = await this.medicalExamService.findById(medicalExamId, ["exam-results"]);
    return medicalExamWithExamResults.examResultID;
  }

  @Get(":id/forms-results/:formConfig") // TODO à changer après la migration des forms au backend
  public async getSpecificFormResultsForMedicalExamId(
    @Param("id") medicalExamId: string,
    @Param("formConfig") formConfig: string
  ) {
    return this.medicalExamService.getSpecificFormResultsForMedicalExamId(medicalExamId, formConfig);
  }
}
