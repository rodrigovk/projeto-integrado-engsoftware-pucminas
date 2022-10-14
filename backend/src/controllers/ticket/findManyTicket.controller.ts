import { Request, Response } from "express";
import { TicketSituacao, UsuarioCompleto } from "@entities";
import { FindManyTicketUseCase, ValidateTicketSituacaoUseCase } from "@use-cases/ticket";
import { AuthUseCase } from "@use-cases/auth";

export class FindManyTicketController {
  constructor(
    private authUseCase: AuthUseCase,
    private findManyTicketUseCase: FindManyTicketUseCase,
    private validateTicketSituacaoUseCase: ValidateTicketSituacaoUseCase,
  ) { }

  async handle(request: Request, res: Response): Promise<Response> {
    let situacao: TicketSituacao = parseInt(request.query.situacao as string);
    if (!Number.isNaN(situacao)) {
      await this.validateTicketSituacaoUseCase.execute(situacao);
    } else {
      situacao = null;
    }

    let assuntoContem: string = request.query.assunto as string;
    if (assuntoContem === "")
      assuntoContem = null;

    const auth = (request as any).auth;
    const usuario: UsuarioCompleto = await this.authUseCase.execute(auth.user, auth.password);

    const idCliente: number = usuario.cliente ? usuario.cliente.idCliente : null;

    const tickets = await this.findManyTicketUseCase.execute(idCliente, situacao, assuntoContem);

    return res.status(200).json(tickets);
  }
}