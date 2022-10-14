import { Cliente, ClienteWithUser, ClienteCreate, ClienteAlter, ClienteSimples } from "@entities";

export interface IClienteRepository {
  findByIdCliente(idCliente: number): Promise<ClienteWithUser | null>;
  findByIdUsuario(idUsuario: number): Promise<Cliente | null>;
  findByCnpjCpf(cnpjCpf: string): Promise<Cliente | null>;
  findMany(includeUsuario: boolean): Promise<Cliente[]>;
  findManySimples(): Promise<ClienteSimples[]>;
  create(cliente: ClienteCreate): Promise<Cliente>;
  alter(cliente: ClienteAlter): Promise<Cliente>;
  delete(idCliente: number): Promise<void>;
  alterSituacao(idCliente: number, situacao: number): Promise<void>;
}