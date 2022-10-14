import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { IClienteRepository } from "@repositories/cliente.repository";
import { ITicketRepository } from "@repositories/ticket.repository";
import { BadRequestException } from "@shared/exceptions/httpException";

export class DeleteClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private ticketRepository: ITicketRepository,
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(idCliente: number) : Promise<void> {
    const ticketCount = await this.ticketRepository.findCountByIdCliente(idCliente);
    if (ticketCount > 0) throw new BadRequestException("Cliente não pode ser excluído pois possui Tickets de suporte.");

    const ticketRespostaCount = await this.ticketRepository.findCountRespostaByIdCliente(idCliente);
    if (ticketRespostaCount > 0) throw new BadRequestException("Cliente não pode ser excluído pois possui respostas em Tickets de suporte.");

    const assinaturaCount = await this.assinaturaRepository.findCountByIdCliente(idCliente);
    if (assinaturaCount > 0) throw new BadRequestException("Cliente não pode ser excluído pois possui assinaturas.");

    return await this.clienteRepository.delete(idCliente);
  }
}