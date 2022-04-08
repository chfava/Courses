import { UpsertExamResultDto } from "../../exam-result/dto/upsert-exam-result.dto";
import { UpsertFormResultDto } from "../../form-result/dto/upsert-form-result.dto";



export class UpdateMedicalExamDto {
  id: string;
  diagnosis?: object;
  formsResults?: UpsertFormResultDto[];
  examResultID?: string;
  patient: string;
  practician: string;
  treatment?: object;
}
