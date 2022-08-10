import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario } from "@entities";

export class FindManyUsuarioByIdUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute() : Promise<Usuario[] | null> {
    return await this.usuarioRepository.findMany();
  }
}