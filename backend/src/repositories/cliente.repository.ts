import { Cliente } from "@entities";

export interface IClienteRepository {
  findByIdCliente(idCliente: number): Promise<Cliente | null>;
  findByIdUsuario(idUsuario: number): Promise<Cliente | null>;
  findByCnpjCpf(cnpjCpf: string): Promise<Cliente | null>;
  findMany(): Promise<Cliente[]>;
  create(cliente: Cliente): Promise<Cliente>; 
}