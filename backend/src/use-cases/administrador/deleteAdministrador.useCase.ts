import { IAdministradorRepository } from "@repositories/administrador.repository";
import { ITicketRepository } from "@repositories/ticket.repository";
import { BadRequestException } from "@shared/exceptions/httpException";

export class DeleteAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(idAdministrador: number) : Promise<void> {
    const ticketRespostaCount = await this.ticketRepository.findCountRespostaByIdAdministrador(idAdministrador);
    if (ticketRespostaCount > 0) throw new BadRequestException("Administrador não pode ser excluído pois possui respostas em Tickets de suporte.");

    return await this.administradorRepository.delete(idAdministrador);
  }
}