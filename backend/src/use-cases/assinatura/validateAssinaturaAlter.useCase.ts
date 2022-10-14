import { IAssinaturaRepository } from "@repositories/assinatura.repository";
import { AssinaturaAlter } from "@entities";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";

export class ValidateAssinaturaAlterUseCase {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
  ) { }

  async execute(assinatura: AssinaturaAlter): Promise<void> {
    if (!assinatura.descricao && assinatura.situacao == null && !assinatura.dataVencimento && !assinatura.dataProximoVencimento && !assinatura.valor) {
      throw new BadRequestException("Nenhum campo para alteração foi informado.");
    }

    if (assinatura.valor) {
      if (assinatura.valor < 0) {
        throw new BadRequestException("Valor não pode ser negativo.");
      }
    }

    return this.assinaturaRepository
      .findByIdAssinatura(assinatura.idAssinatura)
      .then(_assinatura => {
        if (!_assinatura) {
          throw new NotFoundException("Assinatura não encontrado.");
        }
      });
  }
}