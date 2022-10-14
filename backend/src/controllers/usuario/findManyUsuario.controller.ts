import { Request, Response } from "express";
import { FindManyUsuarioUseCase } from "@use-cases/usuario";

export class FindManyUsuarioController {
  constructor(
    private findManyUsuarioByIdUsuarioUseCase: FindManyUsuarioUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    
    const usuarios = await this.findManyUsuarioByIdUsuarioUseCase.execute();

    return res.status(200).json(usuarios);
  }
}