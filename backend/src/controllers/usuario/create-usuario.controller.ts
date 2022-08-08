import { Request, Response } from "express";
import { Usuario } from "@entities";
import { ValidateUsuarioUseCase, CreateUsuarioUseCase } from "@use-cases/usuario";

export class CreateUsuarioController {
  constructor(
    private validateUsuarioUseCase: ValidateUsuarioUseCase,
    private createUsuarioUseCase: CreateUsuarioUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const usuario: Usuario = request.body;

    this.validateUsuarioUseCase.execute(usuario);

    try {
      await this.createUsuarioUseCase.execute(usuario);
  
      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        message: err instanceof Error ? err.message : '' || 'Erro inesperado.'
      })
    }
  }
}