import { IContaRepository } from "@repositories/conta.repository";
import { Conta } from "@entities";

export class FindContaByIdContaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(idConta: number) : Promise<Conta | null> {
    return await this.contaRepository.findByIdConta(idConta);
  }
}