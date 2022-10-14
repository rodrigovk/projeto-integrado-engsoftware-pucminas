import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { IContaRepository } from "@repositories/conta.repository";
import { Conta, ContaCreate, ContaSituacao } from "@entities";

export class GenerateContasAssinaturaVencimentoProximoUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
    private contaRepository: IContaRepository,
  ) { }

  async execute(): Promise<Conta[]> {
    const assinaturas = await this.assinaturaRepository.findManyVencimentoProximo();
    let contasCriadas: Conta[] = [];

    for (const assinatura of assinaturas) {
      const conta: ContaCreate = {
        idCliente: assinatura.idCliente,
        idAssinatura: assinatura.idAssinatura,
        situacao: ContaSituacao.aberta,
        dataVencimento: assinatura.dataProximoVencimento,
        valor: assinatura.valor.toNumber(),
      }
      const contaCriada = await this.contaRepository.create(conta);
      contasCriadas.push(contaCriada);
  
      this.assinaturaRepository.alterDataProximoVencimento(assinatura.idAssinatura, new Date(assinatura.dataProximoVencimento.setMonth(assinatura.dataProximoVencimento.getMonth() + 1)));
    }

    return contasCriadas;
  }
}