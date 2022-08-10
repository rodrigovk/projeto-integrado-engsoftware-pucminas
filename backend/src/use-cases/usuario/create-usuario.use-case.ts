import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario } from "@entities";

export class CreateUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(usuario: Usuario) : Promise<Usuario> {
    return await this.usuarioRepository.create(usuario);
  }
}