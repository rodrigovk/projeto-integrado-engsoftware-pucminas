import express from "express";
import errorHandler from "@frameworks/webserver/middlewares/error-handler";
import "express-async-errors";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };