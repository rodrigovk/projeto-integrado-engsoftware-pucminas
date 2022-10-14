import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket, TicketSituacao } from "@entities";

export class FindManyTicketUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) { }

  async execute(idCliente: number, situacao: TicketSituacao | null, assuntoContem: string | null): Promise<Ticket[]> {
    return await this.ticketRepository.findMany(idCliente, situacao, assuntoContem);
  }
}