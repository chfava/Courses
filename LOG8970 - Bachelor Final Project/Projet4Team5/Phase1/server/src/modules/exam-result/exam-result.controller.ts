import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreateExamResultDto } from "./dto/create-exam-result.dto";
import { UpsertExamResultDto } from "./dto/upsert-exam-result.dto";
import { ExamResultService } from "./exam-result.service";

@Controller("exam-results")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @Post()
  @Permissions("meditrinae-api:exam-results:create")
  async createExamResult(@Body() createExamResultDto: CreateExamResultDto) {
    const res = this.examResultService.create(createExamResultDto);
    return res
  }

  @Get(":id")
  @Permissions("meditrinae-api:exam-results:get")
  async getExamResultByID(@Param("id") examId: string) {
    return this.examResultService.findById(examId);
  }

  @Get("patient-id")
  @Permissions("meditrinae-api:exam-results:get")
  async getPatiendID() {
    return this.examResultService.getPatientId();
  }


  @Get("patient/:id/completed")
  @Permissions("meditrinae-api:exam-results:get")
  async getCompletedExamResultsById(@Param("id") patientID: string) {
    return this.examResultService.findCompletedByPatientId(patientID);
  }

  @Get("patient/:id/:email")
  @Permissions("meditrinae-api:exam-results:get")
  async sendResultsByEmail(@Param("id") patientID: string, @Param("email") email: string) {
    await  this.examResultService.exportFormsByEmail(patientID, email)
    return { "success": true }
  }

  @Get("export-data")
  async exportData() {
    return this.examResultService.export();
  }

  @Put()
  @Permissions("meditrinae-api:exam-results:update")
  async upsertExamsResults(@Body() upsertExamsResultsDto: UpsertExamResultDto[]) {
    return this.examResultService.upsertMany(upsertExamsResultsDto);
  }


  @Get()
  @Permissions("meditrinae-api:exam-results:get")
  async getAllExamsResults() {
    return this.examResultService.find();
  }
}
