import { Request, Response } from "express";
import { FindManyTicketByIdClienteUseCase } from "@use-cases/ticket";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class FindManyTicketByIdClienteController {
  constructor(
    private findManyTicketByIdClienteUseCase: FindManyTicketByIdClienteUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const idCliente: number = Number(req.params.id);

    if (isNaN(idCliente)) { //?
      throw new BadRequestException("ID do cliente inválida.");
    }
    
    const tickets = await this.findManyTicketByIdClienteUseCase.execute(idCliente);

    return res.status(200).json(tickets);
  }
}