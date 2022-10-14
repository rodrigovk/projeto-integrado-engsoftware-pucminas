import express from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";
import errorHandler from "@frameworks/webserver/middlewares/errorHandler";
//import logRequestHandler from "./middlewares/log-request-handler";

const app = express();

//app.use(logRequestHandler);
app.use(cors());
app.use(express.json());
app.use("", router);
app.use(errorHandler);

export { app };