import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario } from "@entities";

export class FindUsuarioByIdUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(idUsuario: number) : Promise<Usuario | null> {
    return await this.usuarioRepository.findByIdUsuario(idUsuario);
  }
}