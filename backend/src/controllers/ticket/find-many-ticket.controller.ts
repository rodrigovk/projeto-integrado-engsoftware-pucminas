import { Request, Response } from "express";
import { FindManyTicketUseCase } from "@use-cases/ticket";

export class FindManyTicketController {
  constructor(
    private findManyTicketUseCase: FindManyTicketUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    const tickets = await this.findManyTicketUseCase.execute();

    return res.status(200).json(tickets);
  }
}