import { Request, Response } from "express";
import { AssinaturaSituacao } from "@entities";
import { AlterAssinaturaSituacaoUseCase } from "@use-cases/assinatura";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { BadRequestException } from "@shared/exceptions/httpException";

export class AlterAssinaturaSituacaoController {
  constructor(
    private alterAssinaturaSituacaoUseCase: AlterAssinaturaSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idAdmistrador: number = Number(request.params.id);

    if (isNaN(idAdmistrador)) {
      throw new BadRequestException("ID do assinatura inválida.");
    }

    validateRequestBodyJson(request);
    const situacao: number = request.body.situacao;

    if ((situacao !== AssinaturaSituacao.ativa) && situacao !== AssinaturaSituacao.inativa) {
      throw new BadRequestException("Situação inválida.");
    }

    await this.alterAssinaturaSituacaoUseCase.execute(idAdmistrador, situacao);

    return response.status(204).send();
  }
}