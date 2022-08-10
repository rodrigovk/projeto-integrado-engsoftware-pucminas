import { Ticket } from "@entities";
import { IClienteRepository } from "@repositories/cliente.repository";
// import { ITicketRepository } from "@repositories/ticket.repository";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class ValidateTicketUseCase {
  constructor(
    private clienteRepository: IClienteRepository
    //private ticketRepository: ITicketRepository,
  ) {}

  async execute(ticket: Ticket) : Promise<void> {
    // if (!ticket.idTicket) {
    //   throw new BadRequestException('ID não informada.'); 
    // }

    if (ticket.idCliente === null) {
      throw new BadRequestException('Cliente não informado.');
    }

    const cliente = await this.clienteRepository.findByIdCliente(ticket.idCliente);
    if (!cliente) {
      throw new BadRequestException("Cliente não encontrado.");
    }

    if (!ticket.assunto) {
      throw new BadRequestException('Assunto não informado.');
    }

    if (!ticket.descricao) {
      throw new BadRequestException('Descrição não informada.');
    }
    
    if (ticket.situacao === null) {
      throw new BadRequestException('Situação não informada.');
    }
  }
}