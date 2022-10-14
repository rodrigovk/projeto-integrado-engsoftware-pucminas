import { Decimal } from "@prisma/client/runtime/index";
import { IContaRepository } from "@repositories/conta.repository";

export class FindAmountContaVencidaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(idCliente: number) : Promise<Decimal> {
    return await this.contaRepository.findAmountVencida(idCliente);
  }
}