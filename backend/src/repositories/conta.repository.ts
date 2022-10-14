import { Conta, ContaCreate } from "@entities";
import { Decimal } from "@prisma/client/runtime/index";

export interface IContaRepository {
  findByIdConta(idConta: number): Promise<Conta | null>;
  findMany(idCliente: number, situacao: number, includeCliente: boolean): Promise<Conta[]>;
  findCountByIdAssinatura(idAssinatura: number): Promise<number>;
  findCountVencida(idCliente: number): Promise<number>;
  findAmountVencida(idCliente: number): Promise<Decimal>;
  create(conta: ContaCreate): Promise<Conta>;
  enclose(idConta: number): Promise<void>;
}