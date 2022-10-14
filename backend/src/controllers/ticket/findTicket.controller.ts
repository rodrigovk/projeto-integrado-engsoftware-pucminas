import { Request, Response } from "express";
import { AuthUseCase } from "@use-cases/auth";
import { FindTicketByIdTicketUseCase } from "@use-cases/ticket";
import { BadRequestException, ForbiddenException } from "@shared/exceptions/httpException";
import { UsuarioCompleto } from "@entities";

export class FindTicketByIdTicketController {
  constructor(
    private authUseCase: AuthUseCase,
    private findTicketByIdTicketUseCase: FindTicketByIdTicketUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idTicket: number = Number(request.params.id);

    if (isNaN(idTicket)) {
      throw new BadRequestException("ID inválida.");
    }

    const ticket = await this.findTicketByIdTicketUseCase.execute(idTicket);
    if (!ticket) {
      throw new BadRequestException("Ticket não encontrado.");
    }

    const auth = (request as any).auth;
    const usuario: UsuarioCompleto = await this.authUseCase.execute(auth.user, auth.password);

    if (usuario.cliente) {
      if (ticket.idCliente !== usuario.cliente.idCliente) {
        throw new ForbiddenException("Ticket não pertence ao usuário logado.");
      }
    }

    return response.status(200).json(ticket);
  }
}