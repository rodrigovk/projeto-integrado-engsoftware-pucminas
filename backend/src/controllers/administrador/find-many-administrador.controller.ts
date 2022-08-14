import { Request, Response } from "express";
import { FindManyAdministradorUseCase } from "@use-cases/administrador";

export class FindManyAdministradorController {
  constructor(
    private findManyAdministradorUseCase: FindManyAdministradorUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
  
    const administradors = await this.findManyAdministradorUseCase.execute();

    return res.status(200).json(administradors);
  }
}