import { config } from "dotenv";
config();

import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import { AppModule } from "./app.module";
import * as express from "express";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ["origin", "content-type", "authorization"]
    }
  });

  app.use(express.static(process.cwd() + "/src/assets/"));

  app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers["origin"]) {
      res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
  });

  // Api home page
  app.getHttpAdapter().get("", (req, res) => {
    res.send(fs.readFileSync(process.cwd() + "/src/assets/api_home.html", "utf8"));
  });

  // Disclaimer
  app.getHttpAdapter().get("/disclaimer", (req, res) => {
    res.send(fs.readFileSync(process.cwd() + "/src/assets/disclaimer.html", "utf8"));
  });

  await app.listen(process.env.PORT);
  console.log(`Server listening on port ${process.env.PORT}`);
}

bootstrap();
