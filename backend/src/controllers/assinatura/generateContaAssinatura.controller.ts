import { Request, Response } from "express";
import { GenerateContaAssinaturaUseCase } from "@use-cases/assinatura";
import { BadRequestException } from "@shared/exceptions/httpException";

export class GenerateContaAssinaturaController {
  constructor(
    private generateContaAssinaturaUseCase: GenerateContaAssinaturaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idAssinatura: number = Number(request.params.id);

    if (isNaN(idAssinatura)) {
      throw new BadRequestException("ID inválida.");
    }

    const contaCriada = await this.generateContaAssinaturaUseCase.execute(idAssinatura);

    return response.status(200).json(contaCriada);
  }
}