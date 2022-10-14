import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import { DeleteUsuarioUseCase } from "@use-cases/usuario";
import { FindAdministradorByIdAdministradorUseCase, DeleteAdministradorUseCase } from "@use-cases/administrador";

export class DeleteAdministradorController {
  constructor(
    private deleteUsuarioUseCase: DeleteUsuarioUseCase,
    private findAdministradorByIdAdministradorUseCase: FindAdministradorByIdAdministradorUseCase,
    private deleteAdministradorUseCase: DeleteAdministradorUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idAdministrador: number = Number(request.params.id);

    if (isNaN(idAdministrador)) {
      throw new BadRequestException("ID inválida.");
    }

    const administrador = await this.findAdministradorByIdAdministradorUseCase.execute(idAdministrador);
    if (!administrador) {
      throw new NotFoundException("Administrador não encontrado.");
    }

    await this.deleteAdministradorUseCase.execute(idAdministrador);
    await this.deleteUsuarioUseCase.execute(administrador.idUsuario);

    return response.status(204).send();
  }
}