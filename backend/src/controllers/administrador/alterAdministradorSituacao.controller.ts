import { Request, Response } from "express";
import { AdministradorSituacao } from "@entities";
import { AlterAdministradorSituacaoUseCase } from "@use-cases/administrador";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { BadRequestException } from "@shared/exceptions/httpException";

export class AlterAdministradorSituacaoController {
  constructor(
    private alterAdministradorSituacaoUseCase: AlterAdministradorSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idAdmistrador: number = Number(request.params.id);

    if (isNaN(idAdmistrador)) {
      throw new BadRequestException("ID do administrador inválida.");
    }

    validateRequestBodyJson(request);
    const situacao: number = request.body.situacao;

    if ((situacao !== AdministradorSituacao.ativo) && situacao !== AdministradorSituacao.inativo) {
      throw new BadRequestException("Situação inválida.");
    }

    await this.alterAdministradorSituacaoUseCase.execute(idAdmistrador, situacao);

    return response.status(204).send();
  }
}