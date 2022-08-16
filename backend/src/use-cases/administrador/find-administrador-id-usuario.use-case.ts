import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador } from "@entities";

export class FindAdministradorByIdUsuarioUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(idUsuario: number) : Promise<Administrador | null> {
    return await this.administradorRepository.findByIdUsuario(idUsuario);
  }
}