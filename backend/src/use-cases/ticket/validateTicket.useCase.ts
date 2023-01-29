import { Ticket } from "@entities";
import { IClienteRepository } from "@repositories/cliente.repository";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateTicketUseCase {
  constructor(
    private clienteRepository: IClienteRepository
  ) { }

  async execute(ticket: Ticket): Promise<void> {
    if (ticket.idCliente == null) {
      throw new BadRequestException("Cliente não informado.");
    }

    const cliente = await this.clienteRepository.findByIdCliente(ticket.idCliente);
    if (!cliente) {
      throw new BadRequestException("Cliente não encontrado.");
    }

    if (!ticket.assunto) {
      throw new BadRequestException("Assunto não informado.");
    }

    if (!ticket.descricao) {
      throw new BadRequestException("Descrição não informada.");
    }

    if (ticket.situacao == null) {
      throw new BadRequestException("Situação não informada.");
    }

    if (ticket.assunto.length < 10) {
      throw new BadRequestException("Assunto possui menos de 10 caracteres.");
    }

    if (ticket.assunto.length > 100) {
      throw new BadRequestException("Assunto possui mais de 100 caracteres.");
    }

    if (ticket.descricao.length < 20) {
      throw new BadRequestException("Descrição possui menos de 20 caracteres.");
    }

    if (ticket.descricao.length > 500) {
      throw new BadRequestException("Descrição possui mais de 500 caracteres.");
    }
  }
}