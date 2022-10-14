import { ITicketRepository } from "@repositories/ticket.repository";

export class AlterTicketSituacaoUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idTicket: number, situacao: number) : Promise<void> {
    return await this.ticketRepository.alterSituacao(idTicket, situacao);
  }
}