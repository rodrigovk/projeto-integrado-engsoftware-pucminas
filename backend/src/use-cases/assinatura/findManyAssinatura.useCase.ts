import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { Assinatura } from "@entities";

export class FindManyAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) {}

  async execute(idCliente: number, includeCliente: boolean) : Promise<Assinatura[]> {
    return await this.assinaturaRepository.findMany(idCliente, includeCliente);
  }
}