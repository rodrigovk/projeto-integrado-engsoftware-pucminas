import { IUsuarioRepository } from "@repositories/usuario.repository";
import { UnauthorizedException } from "@shared/exceptions/http-exception";
import { Usuario } from "@prisma/client";

export class AuthUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(email: string, senha: string) : Promise<Usuario> {
    if (!email) {
      throw new UnauthorizedException("E-mail não informado.");
    }

    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException("Usuário não encontrado.");
    }

    if (usuario.senha !== senha) {
      throw new UnauthorizedException("E-mail ou senha inválidos.");
    }

    //return ((await this.usuarioRepository.findByEmail(email)) != null);
    return usuario;
  }
}