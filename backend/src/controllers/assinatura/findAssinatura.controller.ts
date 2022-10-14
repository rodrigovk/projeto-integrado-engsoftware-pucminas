import { Request, Response } from "express";
import { FindAssinaturaByIdAssinaturaUseCase } from "@use-cases/assinatura";
import { BadRequestException } from "@shared/exceptions/httpException";

export class FindAssinaturaByIdAssinaturaController {
  constructor(
    private findAssinaturaByIdAssinaturaUseCase: FindAssinaturaByIdAssinaturaUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idAssinatura: number = Number(request.params.id);

    if (isNaN(idAssinatura)) {
      throw new BadRequestException("ID inválida.");
    }
    
    const assinatura = await this.findAssinaturaByIdAssinaturaUseCase.execute(idAssinatura);

    return response.status(201).json(assinatura);
  }
}