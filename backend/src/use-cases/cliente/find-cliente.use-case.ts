import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente } from "@entities";

export class FindClienteByIdClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(idCliente: number) : Promise<Cliente | null> {
    return this.clienteRepository.findByIdCliente(idCliente);
  }
}