import { Ticket, TicketResposta } from "@frameworks/database/prisma/client";

enum TicketSituacao {
  aberto = 0,
  encerrado = 1,
}

export { Ticket, TicketResposta, TicketSituacao };