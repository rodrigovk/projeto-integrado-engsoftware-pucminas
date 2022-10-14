import { IContaRepository } from "@repositories/conta.repository";
import { Conta, ContaCreate } from "@entities";

export class CreateContaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(conta: ContaCreate) : Promise<Conta> {
    return await this.contaRepository.create(conta);
  }
}