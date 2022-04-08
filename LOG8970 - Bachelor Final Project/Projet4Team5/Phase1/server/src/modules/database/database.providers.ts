import { FactoryProvider } from "@nestjs/common/interfaces";
import * as mongoose from "mongoose";

const dbUri = process.env.MONGO_DB_URI;

export const databaseProviders: FactoryProvider[] = [
  {
    provide: "DbConnectionToken",
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        dbUri,
        {
          useNewUrlParser: true
        },
        err => {
          if (!err) {
            return;
          }

          console.error(
            "Failed to connect to mongo database:\nCode: " +
              JSON.stringify(err.code || "") +
              "\nMessage: " +
              err.message || ""
          );
          process.exit(1);
        }
      )
  }
];
