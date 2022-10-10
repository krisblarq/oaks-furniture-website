import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/** Connect to mongodb */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("Connected to mongodb");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Cannot connect to database");
    Logging.error(error);
  });

/** Only start the server if mongo connects */
const StartServer = () => {
  app.use((req, res, next) => {
    /** Log the request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on(`finish`, () => {
      /** Log the response */
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`
      );
    });
    next();
  });

  /** API rules */
  app.use((req, res, next) => {
    res.header("Access-COntrol-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-with, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, GET, DELETE"
      );
      return res.status(200).json({});
    }
    next();
  });

  /** Routes */
  app.use("/api/users", userRoutes);

  /** Health Check */
  app.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );
  /** Erro Handling */
  app.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
