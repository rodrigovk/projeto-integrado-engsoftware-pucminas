import { IUsuarioRepository } from "@repositories/usuario.repository";

export class DeleteUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(idUsuario: number) : Promise<void> {
    await this.usuarioRepository.delete(idUsuario);
  }
}