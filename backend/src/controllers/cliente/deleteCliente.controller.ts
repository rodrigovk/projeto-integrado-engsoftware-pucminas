import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import { DeleteUsuarioUseCase } from "@use-cases/usuario";
import { FindClienteByIdClienteUseCase, DeleteClienteUseCase } from "@use-cases/cliente";

export class DeleteClienteController {
  constructor(
    private deleteUsuarioUseCase: DeleteUsuarioUseCase,
    private findClienteByIdClienteUseCase: FindClienteByIdClienteUseCase,
    private deleteClienteUseCase: DeleteClienteUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) {
      throw new BadRequestException("ID inválida.");
    }

    const cliente = await this.findClienteByIdClienteUseCase.execute(idCliente);
    if (!cliente) {
      throw new NotFoundException("Cliente não encontrado.");
    }

    await this.deleteClienteUseCase.execute(idCliente);
    await this.deleteUsuarioUseCase.execute(cliente.idUsuario);

    return response.status(204).send();
  }
}