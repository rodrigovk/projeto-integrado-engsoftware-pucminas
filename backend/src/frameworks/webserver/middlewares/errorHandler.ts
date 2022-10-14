import { Request, Response, NextFunction } from "express";
import { HttpException } from "@shared/exceptions/httpException";
import { ZodError } from "zod";

export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  let status = 500;
  let message = "Ocorreu um erro inesperado.";

  if (err instanceof HttpException) {
    status = err.status || status;
    message = err.message || message;
  } else
    if (err instanceof ZodError) {
      status = 400;
      message = "";
      err.issues.forEach((value) => {
        message = (message ? message + " " : "") + value.message;
      })
    } else {
      message = err.message || message;
    }

  console.log(status, message)

  res
    .status(status)
    .send({
      status,
      message,
    });
}