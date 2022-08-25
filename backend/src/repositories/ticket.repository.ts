import { Ticket, TicketResposta } from "@entities";

export interface ITicketRepository {
  findByIdTicket(idTicket: number): Promise<Ticket | null>;
  findManyByIdCliente(idCliente: number): Promise<Ticket[]>;
  findMany(): Promise<Ticket[]>;
  findCountAguardandoResposta(): Promise<number>;
  findCountRespondido(idCliente: number): Promise<number>;
  create(ticket: Ticket): Promise<Ticket>;
  alterSituacao(idTicket: number, situacao: number): Promise<void>;
  delete(idTicket: number): Promise<void>;

  findRespostaByIdTicketIdResposta(idTicket: number, idResposta: number): Promise<TicketResposta>;
  createResposta(ticketResposta: TicketResposta): Promise<TicketResposta>;
}