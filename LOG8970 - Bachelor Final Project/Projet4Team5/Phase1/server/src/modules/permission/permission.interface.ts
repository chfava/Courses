import { Document } from "mongoose";

export interface PermissionInterface extends Document {
  name: string;
}
