import { Document } from "mongoose";
import { ClinicInterface } from "../clinic/clinic.interface";
import { UserInterface } from "../user/user.interface";

export interface AdminInterface extends Document {
  clinic: string | ClinicInterface;
  dateCreated: Date;
  dateModified: Date;
  firstName: string;
  lastName: string;
  user: string | UserInterface;
}
