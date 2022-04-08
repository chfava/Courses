import { Document } from "mongoose";
import { PermissionInterface } from "../permission/permission.interface";

export interface RoleInterface extends Document {
  name: string;
  permissions: string[] | PermissionInterface[];
}
