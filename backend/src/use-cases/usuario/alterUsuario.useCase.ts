import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario, UsuarioAlter } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class AlterUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(usuario: UsuarioAlter) : Promise<Usuario> {
    if (usuario.email) {
      const usuarioByEmail = await this.usuarioRepository.findByEmail(usuario.email);
      if (usuarioByEmail && (usuarioByEmail.idUsuario != usuario.idUsuario)) throw new BadRequestException("E-mail informado já é utilizado por outro usuário.");
    }
    return await this.usuarioRepository.alter(usuario);
  }
}