import { IClienteRepository } from "@repositories/cliente.repository";

export class AlterClienteSituacaoUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(idCliente: number, situacao: number) : Promise<void> {
    return await this.clienteRepository.alterSituacao(idCliente, situacao);
  }
}