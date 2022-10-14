import { Request, Response } from "express";
import { TicketSituacao } from "@entities";
import { FindManyTicketByIdClienteUseCase, ValidateTicketSituacaoUseCase } from "@use-cases/ticket";
import { BadRequestException } from "@shared/exceptions/httpException";

export class FindManyTicketByIdClienteController {
  constructor(
    private findManyTicketByIdClienteUseCase: FindManyTicketByIdClienteUseCase,
    private validateTicketSituacaoUseCase: ValidateTicketSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) {
      throw new BadRequestException("ID do cliente inválida.");
    }

    let situacao: TicketSituacao = parseInt(request.query.situacao as string);
    if (!Number.isNaN(situacao)) {
      await this.validateTicketSituacaoUseCase.execute(situacao);
    } else {
      situacao = null;
    }
    
    const tickets = await this.findManyTicketByIdClienteUseCase.execute(idCliente, situacao);

    return response.status(200).json(tickets);
  }
}