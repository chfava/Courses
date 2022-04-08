import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { DecisionTreeService } from "./decision-tree.service";

@Controller("decision-tree")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class DecisionTreeController {
  constructor(private readonly decisionTreeService: DecisionTreeService) {}

  @Get(":medicalExamId")
  @Permissions("meditrinae-api:decision-tree:get")
  public async getDecisionTreeResult(@Param("medicalExamId") medicalExamId: string) {
    return this.decisionTreeService.getDecisionTreeResult(medicalExamId);
  }
}
