import { Request, Response } from "express";
import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/find-usuario.use-case";

export class FindUsuarioByIdUsuarioController {
  constructor(
    private findUsuarioByIdUsuarioUseCase: FindUsuarioByIdUsuarioUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idUsuario: number = Number(request.params.id);

    if (isNaN(idUsuario)) { //?
      throw new Error("ID inválida.");
    }

    try {
      const usuario = await this.findUsuarioByIdUsuarioUseCase.execute(idUsuario);
  
      return response.status(201).json(usuario);
    } catch (err) {
      return response.status(400).json({
        message: err instanceof Error ? err.message : '' || 'Erro inesperado.'
      })
    }
  }
}