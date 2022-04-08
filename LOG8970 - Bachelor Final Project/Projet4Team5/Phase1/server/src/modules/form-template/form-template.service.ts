import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FormsData } from "../../data/forms";
import { FormTemplateInterface } from "./form-template.interface";

@Injectable()
export class FormTemplateService {
  constructor(
    @Inject("FormTemplateModelToken")
    private readonly formTemplateModel: Model<FormTemplateInterface>
  ) {}

  public async populateFormTemplates(formsData: FormsData) {
    const formIds = [];
    for (const form of formsData.forms) {
      const res = await this.formTemplateModel
        .findOneAndUpdate({ frontendId: form.frontendId }, form, { new: true, upsert: true })
        .exec();
      formIds.push(res.id);
    }
    return formIds;
  }

  public async findById(formTemplateId: string) {
    return this.formTemplateModel.findById(formTemplateId).exec();
  }

  public async find(conditions?: any) {
    return this.formTemplateModel.find(conditions).exec();
  }
}
