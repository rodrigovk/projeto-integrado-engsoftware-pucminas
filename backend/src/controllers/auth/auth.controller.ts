import { Request, Response } from "express";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import { UsuarioCompleto } from "@entities";
import { AuthUseCase } from "@use-cases/auth";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador/findAdministradorIdUsuario.useCase";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente/findClienteIdUsuario.useCase";
import { InternalServerErrorException, ForbiddenException } from "@shared/exceptions/httpException";

export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,
    private findAdministradorByIdUsuarioUseCase: FindAdministradorByIdUsuarioUseCase,
    private findClienteByIdUsuarioUseCase: FindClienteByIdUsuarioUseCase,
  ) { }

  async executeUseCase(email: string, senha: string): Promise<UsuarioCompleto> {
    return await this.authUseCase.execute(email, senha);
  }

  async executeUseCaseAdmin(email: string, senha: string): Promise<UsuarioCompleto> {
    const usuario = await this.authUseCase.execute(email, senha);
    if (!usuario.administrador)
      throw new ForbiddenException("Usuário não é administrador");
    return usuario;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const credenciais = request.body;

    const usuario = await this.executeUseCase(credenciais.email, credenciais.senha);

    const administrador = await this.findAdministradorByIdUsuarioUseCase.execute(usuario.idUsuario);
    const isAdministrador = !!administrador;
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