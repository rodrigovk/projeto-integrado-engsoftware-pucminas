import { Request, Response } from "express";
import { Usuario } from "@entities";
import { ValidateUsuarioUseCase, CreateUsuarioUseCase } from "@use-cases/usuario";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";

export class CreateUsuarioController {
  constructor(
    private validateUsuarioUseCase: ValidateUsuarioUseCase,
    private createUsuarioUseCase: CreateUsuarioUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const usuario: Usuario = request.body;

    await this.validateUsuarioUseCase.execute(usuario);

    const usuarioCriado = await this.createUsuarioUseCase.execute(usuario);

    return response.status(200).json(usuarioCriado);
  }
}