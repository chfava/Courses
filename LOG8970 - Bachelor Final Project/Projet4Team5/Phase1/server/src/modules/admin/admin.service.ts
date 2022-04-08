import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { AdminInterface } from "./admin.interface";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @Inject("AdminModelToken")
    private readonly adminModel: Model<AdminInterface>
  ) {}

  public async create(createAdminDto: CreateAdminDto) {
    return await this.adminModel.create(createAdminDto);
  }

  public async find(conditions?: any) {
    return await this.adminModel
      .find(conditions)
      .sort({ firstName: 1, lastName: 1 })
      .exec();
  }

  public async findOne(conditions?: any) {
    return await this.adminModel.findOne(conditions).exec();
  }

  public async findById(adminId: string) {
    return await this.adminModel.findById(adminId).exec();
  }

  public async update(updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.findByIdAndUpdate(updateAdminDto.id, updateAdminDto, { new: true }).exec();
  }

  public async delete(adminId: string) {
    return await this.adminModel.findByIdAndDelete(adminId).exec();
  }
}
