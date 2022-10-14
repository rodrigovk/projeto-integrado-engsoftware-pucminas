import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario, UsuarioCreate } from "@entities";

export class CreateUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(usuario: UsuarioCreate) : Promise<Usuario> {
    return await this.usuarioRepository.create(usuario);
  }
}