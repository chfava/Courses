import { Inject, Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { CreateFormResultDto } from "./dto/create-form-result.dto";
import { UpsertFormResultDto } from "./dto/upsert-form-result.dto";
import { FormResultInterface } from "./form-result.interface";

@Injectable()
export class FormResultService {
  constructor(
    @Inject("FormResultModelToken")
    private readonly formResultModel: mongoose.Model<FormResultInterface>
  ) {}

  async create(
    createFormResultDto: CreateFormResultDto | CreateFormResultDto[]
  ): Promise<FormResultInterface | FormResultInterface[]> {
    return await this.formResultModel.create(createFormResultDto);
  }

  async findById(formResultId: string) {
    return await this.formResultModel
      .findById(formResultId)
      .populate("formTemplate")
      .exec();
  }

  async upsertMany(upsertFormsResultsDto: UpsertFormResultDto[]) {
    if (upsertFormsResultsDto.length === 0) {
      return { upsertedIds: {} };
    }

    const bulkOps = upsertFormsResultsDto.map(upsertFormResultDto => {
      let objectId: mongoose.Types.ObjectId;
      if (upsertFormResultDto.id) {
        objectId = new mongoose.Types.ObjectId(upsertFormResultDto.id);
      } else {
        objectId = mongoose.Types.ObjectId();
      }

      return {
        updateOne: {
          filter: { _id: objectId },
          update: {
            $set: {
              formConfig: upsertFormResultDto.formConfig,
              result: upsertFormResultDto.result
            }
          },
          upsert: true
        }
      };
    });

    return this.formResultModel.collection.bulkWrite(bulkOps);
  }

  async find(options?: any) {
    return await this.formResultModel
      .find(options)
      .populate("formTemplate")
      .exec();
  }

  async findOne(options?: any) {
    return await this.formResultModel.findOne(options).exec();
  }

  async scriptMigrateForm2RadioCheckbox() {
    const form2Results = await this.formResultModel.find({
      formConfig: "2"
    });

    const idsForChange = [["3", "2"], ["4", "2"], ["4", "4"], ["4", "6"], ["4", "8"], ["5", "2"], ["5", "4"]];

    for (const form2 of form2Results) {
      if (!form2.result) {
        continue;
      }

      for (const idForChange of idsForChange) {
        let subValue = form2.result[idForChange[0]];
        if (subValue) {
          subValue = subValue[idForChange[1]];
          if (typeof subValue === "number") {
            form2.result[idForChange[0]][idForChange[1]] = [subValue];
          }
        }
      }

      await this.formResultModel.findByIdAndUpdate(form2.id.toString(), { result: form2.result });
    }
  }

  async scriptMigrateNumericalQuestion() {
    const form2Results = await this.formResultModel.find({
      formConfig: "2"
    });

    const idsForChange = [["1", "2"], ["2", "6"]];

    for (const form2 of form2Results) {
      if (!form2.result) {
        continue;
      }

      for (const idForChange of idsForChange) {
        let subValue = form2.result[idForChange[0]];
        if (subValue) {
          subValue = subValue[idForChange[1]];
          if (typeof subValue === "number") {
            form2.result[idForChange[0]][idForChange[1]] = [subValue, null];
          }
        }
      }

      await this.formResultModel.findByIdAndUpdate(form2.id.toString(), { result: form2.result });
    }
  }
}
