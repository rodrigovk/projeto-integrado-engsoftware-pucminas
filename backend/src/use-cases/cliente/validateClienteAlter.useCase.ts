import { IClienteRepository } from "@repositories/cliente.repository";
import { UsuarioAlter, ClienteAlter } from "@entities";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import { ValidateCnpjCpfUseCase } from "@use-cases/shared";

export class ValidateClienteAlterUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private validateCnpjCpfUseCase: ValidateCnpjCpfUseCase,
  ) { }

  async execute(usuario: UsuarioAlter, cliente: ClienteAlter): Promise<void> {
    if (!usuario.email && !usuario.senha && !cliente.nome && cliente.situacao == null && cliente.tipo == null && !cliente.cnpjCpf) {
      throw new BadRequestException("Nenhum campo para alteração foi informado.");
    }

    if (cliente.tipo != null || cliente.cnpjCpf != null) {
      await this.validateCnpjCpfUseCase.execute(cliente.tipo, cliente.cnpjCpf);
    }

    return this.clienteRepository
      .findByIdCliente(cliente.idCliente)
      .then(_cliente => {
        if (!_cliente) {
          throw new NotFoundException("Cliente não encontrado.");
        }
      });
  }
}