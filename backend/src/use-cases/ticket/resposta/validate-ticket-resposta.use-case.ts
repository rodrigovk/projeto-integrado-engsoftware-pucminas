import { TicketResposta } from "@entities";
import { IAdministradorRepository } from "@repositories/administrador.repository";
import { IClienteRepository } from "@repositories/cliente.repository";
import { ITicketRepository } from "@repositories/ticket.repository";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class ValidateTicketRespostaUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
    private clienteRepository: IClienteRepository,
    private ticketRepository: ITicketRepository,
  ) {}

  async execute(resposta: TicketResposta) : Promise<void> {
    if (resposta.idTicket == null) {
      throw new BadRequestException("ID do Ticket não informada."); 
    }

    const ticket = await this.ticketRepository.findByIdTicket(resposta.idTicket);
    if (!ticket) {
      throw new BadRequestException("Ticket não encontrado.");
    }

    if (resposta.idCliente != null) {
      if (resposta.idCliente !== ticket.idCliente) {
        throw new BadRequestException("Cliente da resposta difere do Cliente do ticket.");
      }
    }

    if (resposta.idAdministrador !== null) {
      const administrador = await this.administradorRepository.findByIdAdministrador(resposta.idAdministrador);
      if (!administrador) {
        throw new BadRequestException("Administrador não encontrado.");
      }
    } else 
    if (resposta.idCliente !== null) {
      const cliente = await this.clienteRepository.findByIdCliente(resposta.idCliente);
      if (!cliente) {
        throw new BadRequestException("Cliente não encontrado.");
      }
    } else {
      throw new BadRequestException("Cliente e Administrador não informado.");
    }

    if (!resposta.mensagem) {
      throw new BadRequestException("Mensagem não informada.");
    }

    if (resposta.mensagem.length < 20) { //?
      throw new BadRequestException("Mensagem possui menos de 20 caracteres.");
    }

    if (resposta.mensagem.length < 500) { //?
      throw new BadRequestException("Mensagem possui mais de 500 caracteres.");
    }
  }
}