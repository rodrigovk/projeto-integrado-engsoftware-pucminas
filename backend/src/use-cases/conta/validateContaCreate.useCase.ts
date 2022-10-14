import { IClienteRepository } from "@repositories/cliente.repository";
import { ContaCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";
import { IAssinaturaRepository } from "@repositories/assinatura.repository";

export class ValidateContaCreateUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private assinaturaRepository: IAssinaturaRepository,
  ) { }

  async execute(conta: ContaCreate): Promise<void> {
    if (conta.idAssinatura == null) {
      throw new BadRequestException("Assinatura não informada.");
    }

    if (conta.idCliente == null) {
      throw new BadRequestException("Cliente não informado.");
    }

    if (conta.situacao == null) {
      throw new BadRequestException("Situação não informada.");
    }

    if (conta.dataVencimento == null) {
      throw new BadRequestException("Data de vencimento não informada.");
    }

    if (conta.valor == null) {
      throw new BadRequestException("Valor não informado.");
    }

    const cliente = await this.clienteRepository.findByIdCliente(conta.idCliente);
    if (!cliente) {
      throw new BadRequestException("Cliente não encontrado.");
    }

    const assinatura = await this.assinaturaRepository.findByIdAssinatura(conta.idAssinatura);
    if (!assinatura) {
      throw new BadRequestException("Assinatura não encontrada.");
    }

    if (assinatura.idCliente !== conta.idCliente) {
      throw new BadRequestException("Assinatura não é do cliente informado.");
    }
  }
}