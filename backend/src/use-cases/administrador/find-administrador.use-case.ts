import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador } from "@entities";

export class FindAdministradorByIdAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(idAdministrador: number) : Promise<Administrador | null> {
    return await this.administradorRepository.findByIdAdministrador(idAdministrador);
  }
}