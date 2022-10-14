import { Request, Response } from "express";
import { FindManyAdministradorUseCase } from "@use-cases/administrador";

export class FindManyAdministradorController {
  constructor(
    private findManyAdministradorUseCase: FindManyAdministradorUseCase,
  ) {}

  async handle(request: Request, res: Response): Promise<Response> {
  
    const includeUsuario: boolean = (request.query.includeUsuario === "true");

    const administradores = await this.findManyAdministradorUseCase.execute(includeUsuario);

    return res.status(200).json(administradores);
  }
}