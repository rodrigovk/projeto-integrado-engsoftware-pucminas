import { TicketSituacao } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateTicketSituacaoUseCase {
  constructor() { }

  async execute(situacao: TicketSituacao): Promise<void> {
    if ((situacao !== TicketSituacao.aberto) && situacao !== TicketSituacao.encerrado) {
      throw new BadRequestException("Situação inválida.");
    }
  }
}