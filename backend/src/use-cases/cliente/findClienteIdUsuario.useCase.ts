import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente } from "@entities";

export class FindClienteByIdUsuarioUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(idUsuario: number) : Promise<Cliente | null> {
    return await this.clienteRepository.findByIdUsuario(idUsuario);
  }
}