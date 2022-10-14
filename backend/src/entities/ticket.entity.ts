import { Ticket, TicketResposta } from "@frameworks/database/prisma/client";

enum TicketSituacao {
  aberto = 0,
  encerrado = 1,
}

type TicketRespostaCountByData = {
  count: number
  data: Date
}

export { Ticket, TicketResposta, TicketSituacao, TicketRespostaCountByData };