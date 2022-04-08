import { Document } from "mongoose";
import { PatientInterface } from "../patient/patient.interface";

export interface ClinicInterface extends Document {
  address: string;
  email: string;
  name: string;
  phone: string;
}
