import * as mongoose from "mongoose";

export const formTemplateSchema = new mongoose.Schema({
  disclaimer: String,
  form: Object,
  title: String,

  // Temporary field while form templates are being migrated from the frontend to the backend.
  frontendId: String
});
