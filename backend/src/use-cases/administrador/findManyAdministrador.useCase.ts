import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador } from "@entities";

export class FindManyAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(includeUsuario: boolean) : Promise<Administrador[]> {
    return await this.administradorRepository.findMany(includeUsuario);
  }
}