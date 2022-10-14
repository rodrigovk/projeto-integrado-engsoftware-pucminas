import { ContaSituacao } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateContaSituacaoUseCase {
  constructor() { }

  async execute(situacao: ContaSituacao): Promise<void> {
    if ((situacao !== ContaSituacao.aberta) && situacao !== ContaSituacao.paga) {
      throw new BadRequestException("Situação inválida.");
    }
  }
}