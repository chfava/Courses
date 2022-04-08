import { Document } from "mongoose";

export interface FormTemplateInterface extends Document {
  axis: string;
  disclaimer: string;
  form: any;
  title: string;

  // Temporary field while form templates are being migrated from the frontend to the backend.
  frontendId: string;
}
