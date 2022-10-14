import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador, AdministradorCreate } from "@entities";

export class CreateAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(administrador: AdministradorCreate) : Promise<Administrador> {
    return await this.administradorRepository.create(administrador);
  }
}