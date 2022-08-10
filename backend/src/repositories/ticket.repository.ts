import { Ticket, TicketResposta } from "@entities";

export interface ITicketRepository {
  findByIdTicket(idTicket: number): Promise<Ticket | null>;
  findManyByIdCliente(idCliente: number): Promise<Ticket[]>;
  findMany(): Promise<Ticket[]>;
  create(ticket: Ticket): Promise<Ticket>;
  delete(idTicket: number): Promise<void>;

  createResposta(ticketResposta: TicketResposta): Promise<TicketResposta>;
}