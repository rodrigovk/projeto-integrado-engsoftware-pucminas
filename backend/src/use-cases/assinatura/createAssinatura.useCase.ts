import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { Assinatura, AssinaturaCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class CreateAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(assinatura: AssinaturaCreate) : Promise<Assinatura> {
    const assinaturaCount = await this.assinaturaRepository.findCountByIdCliente(assinatura.idCliente);
    if (assinaturaCount > 0) throw new BadRequestException("Este cliente já possui uma assinatura.");

    return await this.assinaturaRepository.create(assinatura);
  }
}