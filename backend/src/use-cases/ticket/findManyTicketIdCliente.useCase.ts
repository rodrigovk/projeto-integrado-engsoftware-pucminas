import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket, TicketSituacao } from "@entities";

export class FindManyTicketByIdClienteUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idCliente: number, situacao: TicketSituacao | null) : Promise<Ticket[]> {
    return await this.ticketRepository.findManyByIdCliente(idCliente, situacao);
  }
}