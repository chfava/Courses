import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreatePracticianDto } from "./dto/create-practician.dto";
import { UpdatePracticianDto } from "./dto/update-practician.dto";
import { PracticianInterface } from "./practician.interface";

@Injectable()
export class PracticianService {
  constructor(
    @Inject("PracticianModelToken")
    private readonly practicianModel: Model<PracticianInterface>
  ) {}

  public async create(createPracticianDto: CreatePracticianDto) {
    return await this.practicianModel.create(createPracticianDto);
  }

  public async find(conditions?: any) {
    return await this.practicianModel
      .find(conditions)
      .sort({ firstName: 1, lastName: 1 })
      .exec();
  }

  public async findOne(conditions?: any) {
    return await this.practicianModel.findOne(conditions).exec();
  }

  public async findById(practicianId: string) {
    return await this.practicianModel.findById(practicianId).exec();
  }

  public async update(updatePracticianDto: UpdatePracticianDto) {
    return await this.practicianModel
      .findByIdAndUpdate(updatePracticianDto.id, updatePracticianDto, { new: true })
      .exec();
  }

  public async deleteById(practicianId: string) {
    return await this.practicianModel
      .findByIdAndDelete(practicianId);
  }
}
