import { Request, Response, NextFunction } from "express";

export default function logRequestHandler(req: Request, _res: Response, next: NextFunction) {
  console.log(req.rawHeaders);
  console.log(req.body);
  next();
}