import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { ClinicInterface } from "./clinic.interface";
import { CreateClinicDto } from "./dto/create-clinic.dto";
import { UpdateClinicDto } from "./dto/update-clinic.dto";

@Injectable()
export class ClinicService {
  constructor(
    @Inject("ClinicModelToken")
    private readonly clinicModel: Model<ClinicInterface>
  ) {}

  public async create(createClinicDto: CreateClinicDto) {
    return await this.clinicModel.create(createClinicDto);
  }

  public async findById(clinicId: string) {
    return await this.clinicModel.findById(clinicId);
  }

  public async find() {
    return await this.clinicModel.find().sort({ name: 1 });
  }

  public async update(updateClinicDto: UpdateClinicDto) {
    return await this.clinicModel.findByIdAndUpdate(updateClinicDto.id, updateClinicDto, { new: true }).exec();
  }
}
