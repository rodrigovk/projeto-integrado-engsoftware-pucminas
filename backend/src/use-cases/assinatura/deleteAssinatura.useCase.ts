import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { IContaRepository } from "@repositories/conta.repository";
import { BadRequestException } from "@shared/exceptions/httpException";

export class DeleteAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
    private contaRepository: IContaRepository,
  ) {}

  async execute(idAssinatura: number) : Promise<void> {
    const countContas =  await this.contaRepository.findCountByIdAssinatura(idAssinatura);
    if (countContas > 0) throw new BadRequestException("Assinatura não pode ser excluída pois possui contas geradas.");

    return await this.assinaturaRepository.delete(idAssinatura);
  }
}