import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador, AdministradorAlter } from "@entities";

export class AlterAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(administrador: AdministradorAlter) : Promise<Administrador> {
    return await this.administradorRepository.alter(administrador);
  }
}