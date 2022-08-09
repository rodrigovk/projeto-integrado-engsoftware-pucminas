import { Request, Response } from "express";
import { FindClienteByIdClienteUseCase } from "@use-cases/cliente";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class FindClienteByIdClienteController {
  constructor(
    private findClienteByIdClienteUseCase: FindClienteByIdClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) { //?
      throw new BadRequestException("ID inválida.");
    }
    
    const cliente = await this.findClienteByIdClienteUseCase.execute(idCliente);

    return response.status(201).json(cliente);
  }
}