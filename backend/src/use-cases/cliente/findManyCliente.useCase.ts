import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente, ClienteSimples } from "@entities";

export class FindManyClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) { }

  async execute(simples: boolean, includeUsuario: boolean): Promise<Cliente[] | ClienteSimples[]> {
    if (simples)
      return await this.clienteRepository.findManySimples();
    else
      return await this.clienteRepository.findMany(includeUsuario);
  }
}