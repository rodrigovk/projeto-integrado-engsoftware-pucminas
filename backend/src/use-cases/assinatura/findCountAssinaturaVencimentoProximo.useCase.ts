import { IAssinaturaRepository } from "@repositories/assinatura.repository";

export class FindCountAssinaturaVencimentoProximoUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute() : Promise<number> {
    return await this.assinaturaRepository.findCountVencimentoProximo();
  }
}