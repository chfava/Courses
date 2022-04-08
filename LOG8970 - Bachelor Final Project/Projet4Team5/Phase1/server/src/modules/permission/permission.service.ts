import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PermissionInterface } from "./permission.interface";

@Injectable()
export class PermissionService {
  constructor(
    @Inject("PermissionModelToken")
    private readonly permissionModel: Model<PermissionInterface>
  ) {}

  public create(createPermissionDto: CreatePermissionDto) {
    return this.permissionModel.create(createPermissionDto);
  }

  public update(permissionId: string, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionModel.findByIdAndUpdate(permissionId, updatePermissionDto);
  }
}
