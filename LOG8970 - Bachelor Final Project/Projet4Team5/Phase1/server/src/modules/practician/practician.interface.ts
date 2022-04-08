import { Document } from "mongoose";
import { ClinicInterface } from "../clinic/clinic.interface";

export interface PracticianInterface extends Document {
  clinic: string | ClinicInterface;
  firstName: string;
  lastName: string;
  user: string;
  phone: string;
  email: string;
  address: string;
}
