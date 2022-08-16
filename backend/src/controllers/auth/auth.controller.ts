import { Request, Response } from "express";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";
import { Usuario } from "@prisma/client";
import { AuthUseCase } from "@use-cases/auth";
//import { CheckUsuarioIsAdministradorUseCase } from "@use-cases/usuario";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador/find-administrador-id-usuario.use-case";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente/find-cliente-id-usuario.use-case";
import { InternalServerErrorException } from "@shared/exceptions/http-exception";

export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,
    //private checkUsuarioIsAdministradorUseCase: CheckUsuarioIsAdministradorUseCase,
    private findAdministradorByIdUsuarioUseCase: FindAdministradorByIdUsuarioUseCase,
    private findClienteByIdUsuarioUseCase: FindClienteByIdUsuarioUseCase,
  ) { }

  async executeUseCase(email: string, senha: string): Promise<Usuario> {
    return await this.authUseCase.execute(email, senha);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const credenciais = request.body;

    const usuario = await this.executeUseCase(credenciais.email, credenciais.senha);

    //const isAdministrador = await this.checkUsuarioIsAdministradorUseCase.execute(usuario.idUsuario);
    const administrador = await this.findAdministradorByIdUsuarioUseCase.execute(usuario.idUsuario);
    const isAdministrador = (!!administrador);
    let idAdministrador = null;
    let idCliente = null;
    let nome = null;
    if (isAdministrador) {
      idAdministrador = administrador.idAdministrador;
      nome = administrador.nome;
    } else {
      const cliente = await this.findClienteByIdUsuarioUseCase.execute(usuario.idUsuario);
      if (cliente) {
        idCliente = cliente.idCliente;
        nome = cliente.nome;
      } else {
        throw new InternalServerErrorException("Usuário não está ligado a um cliente ou administrador.");
      }
    }

    return response.status(200).json({
      idUsuario: usuario.idUsuario,
      email: usuario.email,
      idAdministrador,
      idCliente,
      nome,
      isAdministrador
    });
  }
}