import { IAdministradorRepository } from "@repositories/administrador.repository";
import { AdministradorWithUser } from "@entities";

export class FindAdministradorByIdAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(idAdministrador: number) : Promise<AdministradorWithUser | null> {
    return await this.administradorRepository.findByIdAdministrador(idAdministrador);
  }
}