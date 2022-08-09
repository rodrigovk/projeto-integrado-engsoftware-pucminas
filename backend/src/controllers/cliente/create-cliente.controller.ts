import { Request, Response } from "express";
import { Cliente } from "@entities";
import { CreateClienteUseCase } from "@use-cases/cliente";

export class CreateClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const cliente: Cliente = request.body;

    await this.createClienteUseCase.execute(cliente);

    return response.status(204).send();
  }
}