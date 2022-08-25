import { ITicketRepository } from "@repositories/ticket.repository";

export class FindCountTicketRespondidoUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idCliente: number) : Promise<number> {
    return await this.ticketRepository.findCountRespondido(idCliente);
  }
}