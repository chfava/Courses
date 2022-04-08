import { Document } from "mongoose";
import { ClinicInterface } from "../clinic/clinic.interface";

export interface SecretaryInterface extends Document {
  clinic: string | ClinicInterface;
  dateCreated: Date;
  dateModified: Date;
  firstName: string;
  lastName: string;
  email: string;
  address: String;
}
