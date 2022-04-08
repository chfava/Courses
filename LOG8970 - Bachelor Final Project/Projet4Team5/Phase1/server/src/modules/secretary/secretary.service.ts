import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateSecretaryDto } from "./dto/create-secretary.dto";
import { UpdateSecretaryDto } from "./dto/update-secretary.dto";
import { SecretaryInterface } from "./secretary.interface";

@Injectable()
export class SecretaryService {
  constructor(
    @Inject("SecretaryModelToken")
    private readonly secretaryModel: Model<SecretaryInterface>
  ) {}

  public async create(createSecretaryDto: CreateSecretaryDto) {
    return await this.secretaryModel.create(createSecretaryDto);
  }

  public async findById(secretaryId: string) {
    return await this.secretaryModel.findById(secretaryId).exec();
  }

  public async find(conditions?: any) {
    return await this.secretaryModel
      .find(conditions)
      .sort({ firstName: 1, lastName: 1 })
      .exec();
  }

  public async findOne(conditions?: any) {
    return await this.secretaryModel.findOne(conditions).exec();
  }

  public async update(updateSecretaryDto: UpdateSecretaryDto) {
    return await this.secretaryModel.findByIdAndUpdate(updateSecretaryDto.id, updateSecretaryDto, { new: true }).exec();
  }

  public async delete(secretaryId: string) {
    return await this.secretaryModel.findByIdAndDelete(secretaryId).exec();
  }
}
