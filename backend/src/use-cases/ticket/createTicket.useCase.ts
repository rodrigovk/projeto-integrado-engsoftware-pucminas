import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket } from "@entities";

export class CreateTicketUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(ticket: Ticket) : Promise<Ticket> {
    return await this.ticketRepository.create(ticket);
  }
}