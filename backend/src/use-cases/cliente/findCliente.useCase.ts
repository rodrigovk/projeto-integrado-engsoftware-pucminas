import { IClienteRepository } from "@repositories/cliente.repository";
import { ClienteWithUser } from "@entities";

export class FindClienteByIdClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(idCliente: number) : Promise<ClienteWithUser | null> {
    return await this.clienteRepository.findByIdCliente(idCliente);
  }
}