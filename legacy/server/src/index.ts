require("dotenv").config();

import cors from "cors";
import express from "express";

import { initDb } from "./data";
import { routes } from "./routes";
import { errorHandler, notFoundHandler } from "./utils/errors";

const PORT = process.env.PORT || 5000;
const SERVER_VERSION = "0";

initDb();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(`/v${SERVER_VERSION}`, (req, res, next) => {
  console.log("BARK");
  next();
});
app.use(`/v${SERVER_VERSION}`, routes);
app.use(notFoundHandler);
app.use(errorHandler);

const launch = () => {
  app.listen(PORT, () => console.log(`App started on port ${PORT}`));
};

launch();