import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { Assinatura } from "@entities";

export class FindAssinaturaByIdAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(idAssinatura: number) : Promise<Assinatura | null> {
    return await this.assinaturaRepository.findByIdAssinatura(idAssinatura);
  }
}