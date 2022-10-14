import { PessoaTipo } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateCnpjCpfUseCase {
  constructor() { }

  async execute(tipo: number, cnpjCpf: string): Promise<void> {
    if (tipo == null) {
      throw new BadRequestException("Tipo não informado.");
    }

    if (!cnpjCpf) {
      throw new BadRequestException("CNPJ/CPF não informado.");
    }

    if (tipo === PessoaTipo.fisico && cnpjCpf.length !== 11) {
      throw new BadRequestException("CPF inválido.");
    }

    if (tipo === PessoaTipo.juridico && cnpjCpf.length !== 14) {
      throw new BadRequestException("CNPJ inválido.");
    }
  }
}