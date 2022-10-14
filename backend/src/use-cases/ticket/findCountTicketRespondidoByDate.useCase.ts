import { TicketRespostaCountByData } from "@entities/ticket.entity";
import { ITicketRepository } from "@repositories/ticket.repository";

export class FindCountTicketRespondidoByDateUseCase {
  constructor(
    private ticketRepository: ITicketRepository,
  ) { }

  async execute(): Promise<TicketRespostaCountByData[]> {
    const resultado = await this.ticketRepository.findCountRespondidoByDate();

    const hoje = new Date();
    hoje.setUTCHours(0, 0, 0, 0);

    const dataInicial = new Date();
    dataInicial.setUTCDate(hoje.getUTCDate() - 15)
    dataInicial.setUTCHours(0, 0, 0, 0);

    for (let data = dataInicial; data <= hoje; data.setUTCDate(data.getUTCDate() + 1)) {
      if (resultado.findIndex((e) => e.data.getTime() === data.getTime()) < 0) {
        resultado.push({ count: 0, data: new Date(data) })
      }
    }
    resultado.sort((a, b) => {
      if (a.data < b.data)
        return -1;
      if (a.data > b.data)
        return 1;
      return 0;
    })

    return resultado;
  }
}