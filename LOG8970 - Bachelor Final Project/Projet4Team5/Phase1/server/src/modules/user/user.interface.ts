import { Document } from "mongoose";
import { RoleInterface } from "../role/role.interface";

export interface UserInterface extends Document {
  firstLogIn: boolean;
  username: string;
  password: string;
  role: string | RoleInterface;
}
