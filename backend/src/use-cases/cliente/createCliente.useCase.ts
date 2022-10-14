import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente, ClienteCreate } from "@entities";

export class CreateClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(cliente: ClienteCreate) : Promise<Cliente> {
    return await this.clienteRepository.create(cliente);
  }
}