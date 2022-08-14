import { ITicketRepository } from "@repositories/ticket.repository";
import { TicketResposta } from "@entities";

export class CreateTicketRespostaUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(ticketResposta: TicketResposta) : Promise<TicketResposta> {
    return await this.ticketRepository.createResposta(ticketResposta);
  }
}