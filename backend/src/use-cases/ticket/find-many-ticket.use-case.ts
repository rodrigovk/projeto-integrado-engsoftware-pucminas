import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket } from "@entities";

export class FindManyTicketUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute() : Promise<Ticket[]> {
    return await this.ticketRepository.findMany();
  }
}