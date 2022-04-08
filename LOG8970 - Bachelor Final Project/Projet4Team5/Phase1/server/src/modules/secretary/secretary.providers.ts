import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { secretarySchema } from "./secretary.schema";

export const secretaryProviders: FactoryProvider[] = [
  {
    provide: "SecretaryModelToken",
    useFactory: (connection: Connection) => connection.model("Secretary", secretarySchema),
    inject: ["DbConnectionToken"]
  }
];
