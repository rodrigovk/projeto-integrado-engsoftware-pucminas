import { Request, Response } from "express";
import { FindClienteByIdClienteUseCase } from "@use-cases/cliente/find-cliente.use-case";

export class FindClienteByIdClienteController {
  constructor(
    private findClienteByIdClienteUseCase: FindClienteByIdClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) { //?
      throw new Error("ID inválida.");
    }

    try {
      const cliente = await this.findClienteByIdClienteUseCase.execute(idCliente);
  
      return response.status(201).json(cliente);
    } catch (err) {
      return response.status(400).json({
        message: err instanceof Error ? err.message : '' || 'Erro inesperado.'
      })
    }
  }
}