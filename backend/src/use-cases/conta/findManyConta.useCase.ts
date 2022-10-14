import { IContaRepository } from "@repositories/conta.repository";
import { Conta } from "@entities";

export class FindManyContaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(idCliente: number, situacao: number, includeCliente: boolean) : Promise<Conta[]> {
    return await this.contaRepository.findMany(idCliente, situacao, includeCliente);
  }
}