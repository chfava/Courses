import { Document } from "mongoose";
import { FormTemplateInterface } from "../form-template/form-template.interface";

export interface FormResultInterface extends Document {
  readonly formConfig: string;
  readonly formTemplate: string | FormTemplateInterface;
  readonly result: any;
}
