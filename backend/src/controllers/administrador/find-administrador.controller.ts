import { Request, Response } from "express";
import { FindAdministradorByIdAdministradorUseCase } from "@use-cases/administrador";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class FindAdministradorByIdAdministradorController {
  constructor(
    private findAdministradorByIdAdministradorUseCase: FindAdministradorByIdAdministradorUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idAdministrador: number = Number(request.params.id);

    if (isNaN(idAdministrador)) { //?
      throw new BadRequestException("ID inválida.");
    }
    
    const administrador = await this.findAdministradorByIdAdministradorUseCase.execute(idAdministrador);

    return response.status(201).json(administrador);
  }
}