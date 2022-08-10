import { Request, Response } from "express";
import { FindManyUsuarioByIdUsuarioUseCase } from "@use-cases/usuario";

export class FindManyUsuarioByIdUsuarioController {
  constructor(
    private findManyUsuarioByIdUsuarioUseCase: FindManyUsuarioByIdUsuarioUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    
    const usuarios = await this.findManyUsuarioByIdUsuarioUseCase.execute();

    return res.status(200).json(usuarios);
  }
}