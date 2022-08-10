import { ITicketRepository } from "@repositories/ticket.repository";
import { Ticket } from "@entities";

export class FindManyTicketByIdClienteUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idCliente: number) : Promise<Ticket[]> {
    return await this.ticketRepository.findManyByIdCliente(idCliente);
  }
}