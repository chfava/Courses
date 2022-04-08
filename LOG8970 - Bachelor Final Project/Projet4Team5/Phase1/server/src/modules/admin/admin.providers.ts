import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { adminSchema } from "./admin.schema";

export const adminProviders: FactoryProvider[] = [
  {
    provide: "AdminModelToken",
    useFactory: (connection: Connection) => connection.model("Admin", adminSchema),
    inject: ["DbConnectionToken"]
  }
];
