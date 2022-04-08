import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { userSchema } from "./user.schema";

export const userProviders: FactoryProvider[] = [
  {
    provide: "UserModelToken",
    useFactory: (connection: Connection) => connection.model("User", userSchema),
    inject: ["DbConnectionToken"]
  }
];
