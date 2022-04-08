import { FactoryProvider } from "@nestjs/common/interfaces";
import { Connection } from "mongoose";
import { formTemplateSchema } from "./form-template.schema";

export const formTemplateProviders: FactoryProvider[] = [
  {
    provide: "FormTemplateModelToken",
    useFactory: (connection: Connection) => connection.model("FormTemplate", formTemplateSchema),
    inject: ["DbConnectionToken"]
  }
];
