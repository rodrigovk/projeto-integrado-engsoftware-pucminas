import { Request, Response } from "express";
import { Cliente } from "@entities";
import { CreateClienteUseCase } from "@use-cases/cliente/create-cliente.use-case";

export class CreateClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const cliente: Cliente = request.body;

    try {
      await this.createClienteUseCase.execute(cliente);
  
      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        message: err instanceof Error ? err.message : '' || 'Erro inesperado.'
      })
    }
  }
}