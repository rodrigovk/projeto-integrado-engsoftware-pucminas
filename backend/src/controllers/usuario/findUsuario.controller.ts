import { Request, Response } from "express";
import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario";
import { BadRequestException } from "@shared/exceptions/httpException";

export class FindUsuarioByIdUsuarioController {
  constructor(
    private findUsuarioByIdUsuarioUseCase: FindUsuarioByIdUsuarioUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idUsuario: number = Number(request.params.id);

    if (isNaN(idUsuario)) {
      throw new BadRequestException("ID inválida.");
    }

    const usuario = await this.findUsuarioByIdUsuarioUseCase.execute(idUsuario);
    if (!usuario) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    return response.status(200).json(usuario);
  }
}