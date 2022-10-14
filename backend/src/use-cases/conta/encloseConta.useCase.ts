import { IContaRepository } from "@repositories/conta.repository";

export class EncloseContaUseCase {
  constructor(
    private contaRepository: IContaRepository,
  ) {}

  async execute(idConta: number) : Promise<void> {
    return await this.contaRepository.enclose(idConta);
  }
}