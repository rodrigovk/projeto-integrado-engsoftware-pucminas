import { IAssinaturaRepository } from "@repositories/assinatura.repository";

export class AlterAssinaturaSituacaoUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(idAssinatura: number, situacao: number) : Promise<void> {
    return await this.assinaturaRepository.alterSituacao(idAssinatura, situacao);
  }
}