import * as mongoose from "mongoose";

export const formResultSchema = new mongoose.Schema({
  formConfig: String,
  formTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "FormTemplate" },
  result: Object
});
