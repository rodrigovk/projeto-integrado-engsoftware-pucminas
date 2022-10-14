import { IClienteRepository } from "@repositories/cliente.repository";
import { AssinaturaCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateAssinaturaCreateUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) { }

  async execute(assinatura: AssinaturaCreate): Promise<void> {
    if (assinatura.idCliente == null) {
      throw new BadRequestException("Cliente não informado.");
    }

    if (!assinatura.descricao) {
      throw new BadRequestException("Descrição não informada.");
    }

    if (assinatura.situacao == null) {
      throw new BadRequestException("Situação não informada.");
    }

    if (assinatura.dataVencimento == null) {
      throw new BadRequestException("Data de vencimento não informada.");
    }

    if (assinatura.dataProximoVencimento == null) {
      throw new BadRequestException("Data do próximo vencimento não informada.");
    }

    if (assinatura.valor == null) {
      throw new BadRequestException("Valor não informado.");
    }
    if (assinatura.valor < 0) {
      throw new BadRequestException("Valor não pode ser negativo.");
    }

    const cliente = await this.clienteRepository.findByIdCliente(assinatura.idCliente);
    if (!cliente) {
      throw new BadRequestException("Cliente não encontrado.");
    }
  }
}