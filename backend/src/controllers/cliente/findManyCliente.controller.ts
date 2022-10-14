import { Request, Response } from "express";
import { FindManyClienteUseCase } from "@use-cases/cliente";

export class FindManyClienteController {
  constructor(
    private findManyClienteUseCase: FindManyClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {

    const simples: boolean = (request.query.simples === "true");
    const includeUsuario: boolean = (request.query.includeUsuario === "true");
  
    const clientes = await this.findManyClienteUseCase.execute(simples, includeUsuario);

    return response.status(200).json(clientes);
  }
}