import { Controller, Get, Header, Post, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { AIService } from "./ai.service";

@Controller("ai")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Get("predict/:id")
  @Permissions("meditrinae-api:ai:predict")
  public async getAIResult(@Param("id") patientID: string) {
    return await this.aiService.getAIResult(patientID);
  }

  @Get("predict/treatment/:id")
  @Permissions("meditrinae-api:ai:predict")
  public async getAIResultTreatment(@Param("id") patientID: string) {
    return await this.aiService.getAITreatmentResult(patientID)
  }

  @Post("train")
  @Permissions("meditrinae-api:ai:train")
  public async trainAI() {
    return this.aiService.trainAI();
  }

  @Get("training-data")
  @Permissions("meditrinae-api:ai:get")
  @Header("Content-Type", "text/csv")
  public async trainingData() {
    //return this.aiService.getTrainingData();
  }

  // ** ONLY USE THIS FOR DEBUGGING / GENERATING REPORTS ** //
  @Post("test")
  public async testAI() {
    return this.aiService.testAI();
  }
}
