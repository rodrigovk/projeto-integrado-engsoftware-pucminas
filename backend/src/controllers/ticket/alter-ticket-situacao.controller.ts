import { Request, Response } from "express";
import { TicketSituacao } from "@entities";
import { AlterTicketSituacaoUseCase } from "@use-cases/ticket";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class AlterTicketSituacaoController {
  constructor(
    private alterTicketSituacaoUseCase: AlterTicketSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idTicket: number = Number(request.params.id);

    if (isNaN(idTicket)) { //?
      throw new BadRequestException("ID do ticket inválida.");
    }

    validateRequestBodyJson(request);
    const situacao: number = request.body.situacao;

    if ((situacao !== TicketSituacao.aberto) && situacao !== TicketSituacao.encerrado) {
      throw new BadRequestException("Situação inválida.");
    }

    await this.alterTicketSituacaoUseCase.execute(idTicket, situacao);

    return response.status(204).send();
  }
}