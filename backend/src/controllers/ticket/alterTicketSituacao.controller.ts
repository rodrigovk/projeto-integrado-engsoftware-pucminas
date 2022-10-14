import { Request, Response } from "express";
import { AlterTicketSituacaoUseCase, FindTicketByIdTicketUseCase, ValidateTicketSituacaoUseCase } from "@use-cases/ticket";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { BadRequestException, ForbiddenException } from "@shared/exceptions/httpException";
import { UsuarioCompleto } from "@entities";
import { AuthUseCase } from "@use-cases/auth";

export class AlterTicketSituacaoController {
  constructor(
    private authUseCase: AuthUseCase,
    private findTicketByIdTicketUseCase: FindTicketByIdTicketUseCase,
    private alterTicketSituacaoUseCase: AlterTicketSituacaoUseCase,
    private validateTicketSituacaoUseCase: ValidateTicketSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idTicket: number = Number(request.params.id);

    if (isNaN(idTicket)) {
      throw new BadRequestException("ID do ticket inválida.");
    }

    validateRequestBodyJson(request);
    const situacao: number = request.body.situacao;
    await this.validateTicketSituacaoUseCase.execute(situacao);

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

    await this.alterTicketSituacaoUseCase.execute(idTicket, situacao);

    return response.status(204).send();
  }
}