import { AdminInterface } from "../admin/admin.interface";
import { PracticianInterface } from "../practician/practician.interface";
import { SecretaryInterface } from "../secretary/secretary.interface";
import { UserInterface } from "../user/user.interface";

export interface JwtPayload {
  admin?: AdminInterface;
  practician?: PracticianInterface;
  secretary?: SecretaryInterface;
  user: UserInterface;
}
