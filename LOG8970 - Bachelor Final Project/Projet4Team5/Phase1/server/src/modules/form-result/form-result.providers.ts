import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { formResultSchema } from "./form-result.schema";

export const formResultProviders: FactoryProvider[] = [
  {
    provide: "FormResultModelToken",
    useFactory: (connection: Connection) => connection.model("FormResult", formResultSchema),
    inject: ["DbConnectionToken"]
  }
];
