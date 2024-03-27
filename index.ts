import mongoose from "mongoose";
import Config from "./utils/Config";
import Logger from "./utils/Logger";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import router from "./router";
import { IUser } from "./models/User";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

const main = async () => {
  // Connect to MongoDB through mongoose
  const url = `mongodb+srv://${Config.variables.mongodb.username}:${Config.variables.mongodb.password}@${Config.variables.mongodb.hostname}/?retryWrites=true&w=majority&appName=${Config.variables.mongodb.database}`;
  await mongoose.connect(url);

  // Create express app
  const app = express();
  app.use(Logger.HTTP());
  app.use(helmet());
  app.use(cors({ origin: "*" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use main router
  app.use("/api", router);

  // Use this route for init call
  app.get("/health", (req, res) => res.json({}));

  // Create server object from Express app
  const server = http.createServer(app);

  // Listen on port from Config
  server.listen(Config.variables.port, () => {
    Logger.Write("Application is ready");
  });
};

// Initialize
main().catch((e) => console.log(e));
