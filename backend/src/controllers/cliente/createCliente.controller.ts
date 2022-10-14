import { Request, Response } from "express";
import { UsuarioCreateSchema, UsuarioCreate, ClienteCreateSchema, ClienteCreate, ClienteSituacao } from "@entities";
import { ValidateUsuarioCreateUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase } from "@use-cases/usuario";
import { CreateClienteUseCase, ValidateClienteCreateUseCase } from "@use-cases/cliente";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateClienteController {
  constructor(
    private validateUsuarioCreateUseCase: ValidateUsuarioCreateUseCase,
    private createUsuarioUseCase: CreateUsuarioUseCase,
    private deleteUsuarioUseCase: DeleteUsuarioUseCase,
    private validateClienteCreateUseCase: ValidateClienteCreateUseCase,
    private createClienteUseCase: CreateClienteUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);

    const usuarioCreate: UsuarioCreate = UsuarioCreateSchema.parse({ ...request.body });

    const clienteCreate: ClienteCreate = ClienteCreateSchema.parse({ idUsuario: 0, ...request.body, situacao: ClienteSituacao.ativo });

    await this.validateUsuarioCreateUseCase.execute(usuarioCreate);

    const usuarioCriado = await this.createUsuarioUseCase.execute(usuarioCreate);
    clienteCreate.idUsuario = usuarioCriado.idUsuario;

    try {
      await this.validateClienteCreateUseCase.execute(clienteCreate);

      const clienteCriado = await this.createClienteUseCase.execute(clienteCreate);

      return response.status(200).json(clienteCriado);
    } catch (err) {
      await this.deleteUsuarioUseCase.execute(usuarioCriado.idUsuario);
      throw err;
    }

    //const cliente: Cliente = request.body;

    //cliente.situacao = ClienteSituacao.ativo;
    //cliente.tipo = (cliente.cnpjCpf.length === 11 ? PessoaTipo.fisico : PessoaTipo.juridico);

    // await this.validateClienteCreateUseCase.execute(cliente);

    // const clienteCriado = await this.createClienteUseCase.execute(cliente);

    // return response.status(200).json(clienteCriado);
  }
}