import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { practicianSchema } from "./practician.schema";

export const practicianProviders: FactoryProvider[] = [
  {
    provide: "PracticianModelToken",
    useFactory: (connection: Connection) => connection.model("Practician", practicianSchema),
    inject: ["DbConnectionToken"]
  }
];
