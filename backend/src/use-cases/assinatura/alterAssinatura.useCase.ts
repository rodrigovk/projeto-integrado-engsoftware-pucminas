import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { Assinatura, AssinaturaAlter } from "@entities";

export class AlterAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(assinatura: AssinaturaAlter) : Promise<Assinatura> {
    return await this.assinaturaRepository.alter(assinatura);
  }
}