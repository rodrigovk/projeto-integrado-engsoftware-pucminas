import { IClienteRepository } from "@repositories/cliente.repository";
import { Cliente, ClienteTipo } from "@entities";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class ValidateClienteUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(cliente: Cliente) : Promise<void> {
    // if (!cliente.idCliente) {
    //   throw new BadRequestException("ID não informada."); 
    // }
    
    if (cliente.idUsuario === null) {
      throw new BadRequestException("Usuário não informado.");
    }

    if (!cliente.cnpjCpf) {
      throw new BadRequestException("CNPJ/CPF não informado.");
    }
    
    if (!cliente.nome) {
      throw new BadRequestException("Nome não informado.");
    }
    
    if (cliente.situacao === null) {
      throw new BadRequestException("Situação não informada.");
    }
    
    if (cliente.tipo === null) {
      throw new BadRequestException("Tipo não informado.");
    }

    if (cliente.tipo === ClienteTipo.fisico && cliente.cnpjCpf.length !== 11) {
      throw new BadRequestException("CPF inválido.");
    }
    
    if (cliente.tipo === ClienteTipo.juridico && cliente.cnpjCpf.length !== 14) {
      throw new BadRequestException("CNPJ inválido.");
    }

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