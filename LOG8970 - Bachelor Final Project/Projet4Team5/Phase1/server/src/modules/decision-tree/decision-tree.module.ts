import { Module } from "@nestjs/common";
import { DecisionTreeController } from "./decision-tree.controller";
import { DecisionTreeService } from "./decision-tree.service";
import { MedicalExamModule } from "../medical-exam/medical-exam.module";

@Module({
  imports: [MedicalExamModule],
  controllers: [DecisionTreeController],
  providers: [DecisionTreeService],
  exports: [DecisionTreeService]
})
export class DecisionTreeModule {}
