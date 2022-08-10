import { Request, Response } from "express";
import { DeleteUsuarioUseCase } from "@use-cases/usuario";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class DeleteUsuarioController {
  constructor(
    private deleteUsuarioUseCase: DeleteUsuarioUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idUsuario: number = Number(request.params.id);

    if (isNaN(idUsuario)) { //?
      throw new BadRequestException("ID inválida.");
    }

    await this.deleteUsuarioUseCase.execute(idUsuario);

    return response.status(204).send();
  }
}