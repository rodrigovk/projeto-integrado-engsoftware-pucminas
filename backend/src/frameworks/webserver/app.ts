import express from "express";
import errorHandler from "@frameworks/webserver/middlewares/error-handler";
import "express-async-errors";
import router from "./routes";
import basicAuth from "./middlewares/basic-auth";

const app = express();

app.use(express.json());
app.use(basicAuth());
app.use(router);
app.use(errorHandler);

export { app };