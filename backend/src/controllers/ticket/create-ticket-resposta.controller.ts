import { Request, Response } from "express";
import { TicketResposta } from "@entities";
import { CreateTicketRespostaUseCase } from "@use-cases/ticket";

export class CreateTicketRespostaController {
  constructor(
    private createTicketRespostaUseCase: CreateTicketRespostaUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const ticketResposta: TicketResposta = request.body;

    const ticketRespostaCriado = await this.createTicketRespostaUseCase.execute(ticketResposta);

    return response.status(200).json({
      idTicket: ticketRespostaCriado.idTicket
    });
  }
}