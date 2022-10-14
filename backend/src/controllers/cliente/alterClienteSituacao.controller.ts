import { Request, Response } from "express";
import { ClienteSituacao } from "@entities";
import { AlterClienteSituacaoUseCase } from "@use-cases/cliente";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { BadRequestException } from "@shared/exceptions/httpException";

export class AlterClienteSituacaoController {
  constructor(
    private alterClienteSituacaoUseCase: AlterClienteSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) {
      throw new BadRequestException("ID do cliente inválida.");
    }

    validateRequestBodyJson(request);
    const situacao: number = request.body.situacao;

    if ((situacao !== ClienteSituacao.ativo) && situacao !== ClienteSituacao.inativo) {
      throw new BadRequestException("Situação inválida.");
    }

    await this.alterClienteSituacaoUseCase.execute(idCliente, situacao);

    return response.status(204).send();
  }
}