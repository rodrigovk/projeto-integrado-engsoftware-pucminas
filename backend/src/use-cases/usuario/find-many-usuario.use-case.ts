import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario } from "@entities";

export class FindManyUsuarioByIdUsuarioUseCase { //? não uso o id usuário, trocar o nome
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute() : Promise<Usuario[] | null> {
    return await this.usuarioRepository.findMany();
  }
}