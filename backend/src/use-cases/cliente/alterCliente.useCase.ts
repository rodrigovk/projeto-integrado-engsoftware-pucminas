import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente, ClienteAlter } from "@entities";

export class AlterClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(cliente: ClienteAlter) : Promise<Cliente> {
    return await this.clienteRepository.alter(cliente);
  }
}