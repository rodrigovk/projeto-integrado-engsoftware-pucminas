import { Request, Response } from "express";
import { TicketResposta } from "@entities";
import { CreateTicketRespostaUseCase, ValidateTicketRespostaUseCase } from "@use-cases/ticket";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";

export class CreateTicketRespostaController {
  constructor(
    private createTicketRespostaUseCase: CreateTicketRespostaUseCase,
    private validateTicketRespostaUseCase: ValidateTicketRespostaUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const ticketResposta: TicketResposta = request.body;

    await this.validateTicketRespostaUseCase.execute(ticketResposta);

    const ticketRespostaCriado = await this.createTicketRespostaUseCase.execute(ticketResposta);

    return response.status(200).json(ticketRespostaCriado);
  }
}