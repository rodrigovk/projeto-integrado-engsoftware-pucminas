import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import {
  UsuarioAlterSchema, UsuarioAlter,
  ClienteAlterSchema, ClienteAlter
} from "@entities";
import { AlterUsuarioUseCase } from "@use-cases/usuario";
import { ValidateClienteAlterUseCase, AlterClienteUseCase, FindClienteByIdClienteUseCase } from "@use-cases/cliente";

export class AlterClienteController {
  constructor(
    private validateClienteAlterUseCase: ValidateClienteAlterUseCase,
    private alterUsuarioUseCase: AlterUsuarioUseCase,
    private alterClienteUseCase: AlterClienteUseCase,
    private findClienteByIdClienteUseCase: FindClienteByIdClienteUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idCliente: number = Number(request.params.id);

    if (isNaN(idCliente)) {
      throw new BadRequestException("ID inválida.");
    }

    validateRequestBodyJson(request);
    
    const cliente = await this.findClienteByIdClienteUseCase.execute(idCliente);
    if (!cliente) {
      throw new NotFoundException("Cliente não encontrado.");
    }

    const usuarioAlter: UsuarioAlter = UsuarioAlterSchema.parse({ idUsuario: cliente.usuario.idUsuario, ...request.body });
    const clienteAlter: ClienteAlter = ClienteAlterSchema.parse({ idCliente, ...request.body });

    await this.validateClienteAlterUseCase.execute(usuarioAlter, clienteAlter);

    await this.alterUsuarioUseCase.execute(usuarioAlter);
    await this.alterClienteUseCase.execute(clienteAlter);

    const clienteAlterado = await this.findClienteByIdClienteUseCase.execute(idCliente);

    return response.status(200).json(clienteAlterado);
  }
}