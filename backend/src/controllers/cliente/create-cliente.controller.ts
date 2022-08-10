import { Request, Response } from "express";
import { Cliente, ClienteSituacao, ClienteTipo } from "@entities";
import { CreateClienteUseCase, ValidateClienteUseCase } from "@use-cases/cliente";

export class CreateClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
    private validateClienteUseCase: ValidateClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const cliente: Cliente = request.body;

    cliente.situacao = ClienteSituacao.ativo;
    cliente.tipo = (cliente.cnpjCpf.length === 11 ? ClienteTipo.fisico : ClienteTipo.juridico);

    await this.validateClienteUseCase.execute(cliente);

    await this.createClienteUseCase.execute(cliente);

    return response.status(204).send();
  }
}