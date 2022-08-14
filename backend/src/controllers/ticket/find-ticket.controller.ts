import { Request, Response } from "express";
import { FindTicketByIdTicketUseCase } from "@use-cases/ticket";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class FindTicketByIdTicketController {
  constructor(
    private findTicketByIdTicketUseCase: FindTicketByIdTicketUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idTicket: number = Number(request.params.id);

    if (isNaN(idTicket)) { //?
      throw new BadRequestException("ID inválida.");
    }

    const ticket = await this.findTicketByIdTicketUseCase.execute(idTicket);
    if (!ticket) {
      throw new BadRequestException("Ticket não encontrado.");
    }

    return response.status(200).json(ticket);
  }
}