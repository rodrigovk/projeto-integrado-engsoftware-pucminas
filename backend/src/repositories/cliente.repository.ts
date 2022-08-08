import { Cliente } from "@entities";

export interface IClienteRepository {
  findByIdCliente(idCliente: number): Promise<Cliente | null>;
  create(cliente: Cliente): Promise<void>; 
}