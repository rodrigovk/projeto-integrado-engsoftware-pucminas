import { ITicketRepository } from "@repositories/ticket.repository";

export class FindCountTicketAguardandoRespostaUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) {}

  async execute() : Promise<number> {
    return await this.ticketRepository.findCountAguardandoResposta();
  }
}