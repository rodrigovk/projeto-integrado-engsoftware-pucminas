import { IClienteRepository } from "@repositories/cliente.repository";
import { ClienteCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";
import { ValidateCnpjCpfUseCase } from "@use-cases/shared/validateCnpjCpf.useCase";

export class ValidateClienteCreateUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private validateCnpjCpfUseCase: ValidateCnpjCpfUseCase,
  ) { }

  async execute(cliente: ClienteCreate): Promise<void> {
    if (cliente.idUsuario == null) {
      throw new BadRequestException("Usuário não informado.");
    }

    if (!cliente.nome) {
      throw new BadRequestException("Nome não informado.");
    }

    if (cliente.situacao == null) {
      throw new BadRequestException("Situação não informada.");
    }

    await this.validateCnpjCpfUseCase.execute(cliente.tipo, cliente.cnpjCpf);

    // if (cliente.tipo == null) {
    //   throw new BadRequestException("Tipo não informado.");
    // }

    // if (cliente.tipo === PessoaTipo.fisico && cliente.cnpjCpf.length !== 11) {
    //   throw new BadRequestException("CPF inválido.");
    // }

    // if (cliente.tipo === PessoaTipo.juridico && cliente.cnpjCpf.length !== 14) {
    //   throw new BadRequestException("CNPJ inválido.");
    // }

    // if (!cliente.cnpjCpf) {
    //   throw new BadRequestException("CNPJ/CPF não informado.");
    // }

    return this.clienteRepository
      .findByCnpjCpf(cliente.cnpjCpf)
      .then((clienteComCnpjCpf) => {
        if (clienteComCnpjCpf) {
          throw new BadRequestException("Já existe um cliente com o CNPJ/CPF informado.");
        }
        return this.clienteRepository.findByIdUsuario(cliente.idUsuario);
      })
      .then((clienteComIdUsuario) => {
        if (clienteComIdUsuario) {
          throw new BadRequestException("Já existe um cliente linkado com o Usuário informado.");
        }
      });
  }
}