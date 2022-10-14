import { Request, Response } from "express";
import { Ticket, TicketSituacao } from "@entities";
import { ValidateTicketUseCase, CreateTicketUseCase } from "@use-cases/ticket";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateTicketController {
  constructor(
    private validateTicketUseCase: ValidateTicketUseCase,
    private createTicketUseCase: CreateTicketUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const ticket: Ticket = request.body;

    ticket.situacao = TicketSituacao.aberto;
    
    await this.validateTicketUseCase.execute(ticket);

    const ticketCriado = await this.createTicketUseCase.execute(ticket);

    return response.status(200).json(ticketCriado);
  }
}