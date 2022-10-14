import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { AssinaturaAlterSchema, AssinaturaAlter } from "@entities";
import { ValidateAssinaturaAlterUseCase, AlterAssinaturaUseCase, FindAssinaturaByIdAssinaturaUseCase } from "@use-cases/assinatura";

export class AlterAssinaturaController {
  constructor(
    private validateAssinaturaAlterUseCase: ValidateAssinaturaAlterUseCase,
    private alterAssinaturaUseCase: AlterAssinaturaUseCase,
    private findAssinaturaByIdAssinaturaUseCase: FindAssinaturaByIdAssinaturaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idAssinatura: number = Number(request.params.id);

    if (isNaN(idAssinatura)) {
      throw new BadRequestException("ID inválida.");
    }

    validateRequestBodyJson(request);

    const assinatura = await this.findAssinaturaByIdAssinaturaUseCase.execute(idAssinatura);
    if (!assinatura) {
      throw new NotFoundException("Assinatura não encontrada.");
    }

    const assinaturaAlter: AssinaturaAlter = AssinaturaAlterSchema.parse({ idAssinatura, ...request.body });

    await this.validateAssinaturaAlterUseCase.execute(assinaturaAlter);

    await this.alterAssinaturaUseCase.execute(assinaturaAlter);

    const assinaturaAlterado = await this.findAssinaturaByIdAssinaturaUseCase.execute(idAssinatura);

    return response.status(200).json(assinaturaAlterado);
  }
}