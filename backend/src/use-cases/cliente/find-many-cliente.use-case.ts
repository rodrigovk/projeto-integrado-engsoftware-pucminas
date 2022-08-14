import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente } from "@entities";

export class FindManyClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute() : Promise<Cliente[]> {
    return await this.clienteRepository.findMany();
  }
}