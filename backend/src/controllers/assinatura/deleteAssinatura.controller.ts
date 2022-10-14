import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import { FindAssinaturaByIdAssinaturaUseCase, DeleteAssinaturaUseCase } from "@use-cases/assinatura";

export class DeleteAssinaturaController {
  constructor(
    private findAssinaturaByIdAssinaturaUseCase: FindAssinaturaByIdAssinaturaUseCase,
    private deleteAssinaturaUseCase: DeleteAssinaturaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idAssinatura: number = Number(request.params.id);

    if (isNaN(idAssinatura)) {
      throw new BadRequestException("ID inválida.");
    }

    if (!await this.findAssinaturaByIdAssinaturaUseCase.execute(idAssinatura)) {
      throw new NotFoundException("Assinatura não encontrada.");
    }

    await this.deleteAssinaturaUseCase.execute(idAssinatura);

    return response.status(204).send();
  }
}