import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { permissionSchema } from "./permission.schema";

export const permissionProviders: FactoryProvider[] = [
  {
    provide: "PermissionModelToken",
    useFactory: (connection: Connection) => connection.model("Permission", permissionSchema),
    inject: ["DbConnectionToken"]
  }
];
