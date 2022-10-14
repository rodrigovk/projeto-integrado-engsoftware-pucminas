import { Request, Response } from "express";
import { UsuarioCreateSchema, UsuarioCreate } from "@entities";
import { ValidateUsuarioCreateUseCase, CreateUsuarioUseCase } from "@use-cases/usuario";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateUsuarioController {
  constructor(
    private validateUsuarioCreateUseCase: ValidateUsuarioCreateUseCase,
    private createUsuarioUseCase: CreateUsuarioUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const usuarioCreate: UsuarioCreate = UsuarioCreateSchema.parse({ ...request.body });

    await this.validateUsuarioCreateUseCase.execute(usuarioCreate);

    const usuarioCriado = await this.createUsuarioUseCase.execute(usuarioCreate);

    return response.status(200).json(usuarioCriado);
  }
}