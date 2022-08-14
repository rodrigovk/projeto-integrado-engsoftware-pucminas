import { BadRequestException } from "@shared/exceptions/http-exception";
import { Request } from "express";

export default function validateRequestBodyJson(request: Request) {
  if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
    throw new BadRequestException("Conteúdo da requisição não informado.");
  }
}