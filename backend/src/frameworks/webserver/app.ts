import express from "express";
import errorHandler from "@frameworks/webserver/middlewares/error-handler";
import "express-async-errors";
import { router, routerAuth } from "./routes";
import basicAuth from "./middlewares/basic-auth";
import cors from "cors";
//import logRequestHandler from "./middlewares/log-request-handler";

const app = express();

//app.use(logRequestHandler);
app.use(cors());
app.use(express.json());
app.use('/auth', router);
app.use('', basicAuth(), routerAuth);
app.use(errorHandler);

export { app };