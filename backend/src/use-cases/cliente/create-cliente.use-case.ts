import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente } from "@entities";

export class CreateClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(cliente: Cliente) : Promise<void> {
    return await this.clienteRepository.create(cliente);
  }
}