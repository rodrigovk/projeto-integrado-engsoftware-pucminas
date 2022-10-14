import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket } from "@entities";

export class FindTicketByIdTicketUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idTicket: number) : Promise<Ticket | null> {
    return await this.ticketRepository.findByIdTicket(idTicket);
  }
}