import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { roleSchema } from "./role.schema";

export const roleProviders: FactoryProvider[] = [
  {
    provide: "RoleModelToken",
    useFactory: (connection: Connection) => connection.model("Role", roleSchema),
    inject: ["DbConnectionToken"]
  }
];
