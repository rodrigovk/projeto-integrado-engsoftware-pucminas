import { IContaRepository } from "@repositories/conta.repository";

export class FindCountContaVencidaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(idCliente: number) : Promise<number> {
    return await this.contaRepository.findCountVencida(idCliente);
  }
}