import { Request, Response, NextFunction } from 'express';
import { HttpException } from "@shared/exceptions/http-exception";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let status = 500;
  let message = 'Ocorreu um erro inesperado.';

  if (err instanceof HttpException) {
    status = err.status || status;
    message = err.message || message;
  } else {
    message = err.message || message;
  }

  res
    .status(status)
    .send({
      status,
      message,
    });
}