import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { IContaRepository } from "@repositories/conta.repository";
import { Conta, ContaCreate, ContaSituacao } from "@entities";

export class GenerateContaAssinaturaUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
    private contaRepository: IContaRepository,
  ) { }

  async execute(idAssinatura: number): Promise<Conta> {
    const assinatura = await this.assinaturaRepository.findByIdAssinatura(idAssinatura);
    
    const conta: ContaCreate = {
      idCliente: assinatura.idCliente,
      idAssinatura: assinatura.idAssinatura,
      situacao: ContaSituacao.aberta,
      dataVencimento: assinatura.dataProximoVencimento,
      valor: assinatura.valor.toNumber(),
    }
    const contaCriada = await this.contaRepository.create(conta);

    this.assinaturaRepository.alterDataProximoVencimento(assinatura.idAssinatura, new Date(assinatura.dataProximoVencimento.setMonth(assinatura.dataProximoVencimento.getMonth() + 1)));

    return contaCriada;
  }
}