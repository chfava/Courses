import { CreateFormResultDto } from "../../form-result/dto/create-form-result.dto";
import { CreateExamResultDto } from "src/modules/exam-result/dto/create-exam-result.dto";

export class CreateMedicalExamDto {
  diagnosis?: object;
  formsResults?: CreateFormResultDto[];
  examResultID?: string;
  patient: string;
  practician: string;
  treatment?: object;
}
