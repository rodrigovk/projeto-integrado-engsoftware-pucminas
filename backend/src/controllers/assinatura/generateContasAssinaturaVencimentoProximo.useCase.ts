import { Request, Response } from "express";
import { GenerateContasAssinaturaVencimentoProximoUseCase } from "@use-cases/assinatura";

export class GenerateContasAssinaturaVencimentoProximoController {
  constructor(
    private generateContasAssinaturaVencimentoProximoUseCase: GenerateContasAssinaturaVencimentoProximoUseCase,
  ) { }

  async handle(_request: Request, response: Response): Promise<Response> {
    const contasCriadas = await this.generateContasAssinaturaVencimentoProximoUseCase.execute();

    return response.status(200).json(contasCriadas);
  }
}