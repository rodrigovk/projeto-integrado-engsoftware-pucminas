import { IAssinaturaRepository } from "@repositories/assinatura.repository";

export class AlterAssinaturaDataProximoVencimentoUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(idAssinatura: number, dataProximoVencimento: Date) : Promise<void> {
    return await this.assinaturaRepository.alterDataProximoVencimento(idAssinatura, dataProximoVencimento);
  }
}