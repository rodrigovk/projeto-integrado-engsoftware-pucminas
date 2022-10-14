import { Ticket, TicketResposta, TicketSituacao, TicketRespostaCountByData } from "@entities";

export interface ITicketRepository {
  findByIdTicket(idTicket: number): Promise<Ticket | null>;
  findManyByIdCliente(idCliente: number, situacao: TicketSituacao | null): Promise<Ticket[]>;
  findMany(idCliente: number, situacao: TicketSituacao | null, assuntoContem: string | null): Promise<Ticket[]>;
  findCountByIdCliente(idCliente: number): Promise<number>;
  findCountAguardandoResposta(): Promise<number>;
  findCountRespondido(idCliente: number): Promise<number>;
  findCountRespondidoByDate(): Promise<TicketRespostaCountByData[]>;
  create(ticket: Ticket): Promise<Ticket>;
  alterSituacao(idTicket: number, situacao: number): Promise<void>;
  delete(idTicket: number): Promise<void>;
  
  findRespostaByIdTicketIdResposta(idTicket: number, idResposta: number): Promise<TicketResposta>;
  findCountRespostaByIdCliente(idCliente: number): Promise<number>;
  findCountRespostaByIdAdministrador(idAdministrador: number): Promise<number>;
  createResposta(ticketResposta: TicketResposta): Promise<TicketResposta>;
}