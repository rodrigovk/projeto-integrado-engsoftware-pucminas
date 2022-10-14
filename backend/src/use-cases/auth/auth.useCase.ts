import { IUsuarioRepository } from "@repositories/usuario.repository";
import { UnauthorizedException } from "@shared/exceptions/httpException";
import { UsuarioCompleto } from "@entities";

export class AuthUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(email: string, senha: string) : Promise<UsuarioCompleto> {
    if (!email) {
      throw new UnauthorizedException("E-mail não informado.");
    }

    const usuario = await this.usuarioRepository.findCompletoByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException("Usuário não encontrado.");
    }

    if (usuario.senha !== senha) {
      throw new UnauthorizedException("E-mail ou senha inválidos.");
    }

    return usuario;
  }
}