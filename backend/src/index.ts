import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import userRoutes from "./routes/user.routes";

const router = express();

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
  router.use((req, res, next) => {
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

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** API rules */
  router.use((req, res, next) => {
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
  router.use("/api/createUsers", userRoutes);

  /** Health Check */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );
  /** Erro Handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
