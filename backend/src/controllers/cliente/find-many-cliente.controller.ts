import { Request, Response } from "express";
import { FindManyClienteUseCase } from "@use-cases/cliente";

export class FindManyClienteController {
  constructor(
    private findManyClienteUseCase: FindManyClienteUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
  
    const clientes = await this.findManyClienteUseCase.execute();

    return res.status(200).json(clientes);
  }
}