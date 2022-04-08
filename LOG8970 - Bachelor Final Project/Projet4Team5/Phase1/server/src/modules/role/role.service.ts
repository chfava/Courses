import { Inject, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { RolesData } from "../../data/roles";
import { PermissionInterface } from "../permission/permission.interface";
import { RoleInterface } from "./role.interface";

@Injectable()
export class RoleService {
  constructor(
    @Inject("RoleModelToken")
    private readonly roleModel: Model<RoleInterface>,
    @Inject("PermissionModelToken")
    private readonly permissionModel: Model<PermissionInterface>
  ) {}

  public async populateRolesAndPermissions(rolesData: RolesData) {
    // Gather all permissions and filter duplicates.
    const allPermissions: string[][] = rolesData.roles.map(role => role.permissions);
    let allUniquePermissions: string[] = [].concat.apply([], allPermissions);
    allUniquePermissions = allUniquePermissions.filter((permission, index) => {
      return (
        allUniquePermissions.findIndex(otherPermission => {
          return otherPermission === permission;
        }) === index
      );
    });

    const permissionIdMap: { [key: string]: Types.ObjectId } = {};

    // Upsert all permissions.
    for (const permission of allUniquePermissions) {
      const res = await this.permissionModel
        .findOneAndUpdate({ name: permission }, { name: permission }, { new: true, upsert: true })
        .exec();
      permissionIdMap[permission] = new Types.ObjectId(res._id);
    }

    // Convert roles permissions names to ids and upsert roles.
    for (const role of rolesData.roles) {
      const permissionIds = role.permissions.map(permissionName => permissionIdMap[permissionName]);
      await this.roleModel
        .findOneAndUpdate(
          { name: role.name },
          { name: role.name, permissions: permissionIds },
          { new: true, upsert: true }
        )
        .exec();
    }
  }

  public async findOne(conditions?: any) {
    return this.roleModel.findOne(conditions).exec();
  }
}
