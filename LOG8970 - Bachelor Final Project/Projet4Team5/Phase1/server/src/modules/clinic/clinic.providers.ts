import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { clinicSchema } from "./clinic.schema";

export const clinicProviders: FactoryProvider[] = [
  {
    provide: "ClinicModelToken",
    useFactory: (connection: Connection) => connection.model("Clinic", clinicSchema),
    inject: ["DbConnectionToken"]
  }
];
