import { ITicketRepository } from "@repositories/ticket.repository";
import { TicketResposta } from "@entities";

export class CreateTicketRespostaUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(ticketResposta: TicketResposta) : Promise<TicketResposta> {
    const ticketCriado = await this.ticketRepository.createResposta(ticketResposta);

    return await this.ticketRepository.findRespostaByIdTicketIdResposta(ticketCriado.idTicket, ticketCriado.idResposta);
  }
}