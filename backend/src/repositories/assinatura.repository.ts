import { Assinatura, AssinaturaCreate, AssinaturaAlter } from "@entities";

export interface IAssinaturaRepository {
  findByIdAssinatura(idAssinatura: number): Promise<Assinatura | null>;
  findMany(idCliente: number, includeCliente: boolean): Promise<Assinatura[]>;
  findCountByIdCliente(idCliente: number): Promise<number>;
  findCountVencimentoProximo(): Promise<number>;
  findManyVencimentoProximo(): Promise<Assinatura[]>;
  create(assinatura: AssinaturaCreate): Promise<Assinatura>;
  alter(assinatura: AssinaturaAlter): Promise<Assinatura>;
  delete(idAssinatura: number): Promise<void>;
  alterSituacao(idAssinatura: number, situacao: number): Promise<void>;
  alterDataProximoVencimento(idAssinatura: number, dataProximoVencimento: Date): Promise<void>;
}