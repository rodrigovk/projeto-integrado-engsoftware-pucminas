import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador } from "@entities";

export class CreateAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(administrador: Administrador) : Promise<Administrador> {
    return await this.administradorRepository.create(administrador);
  }
}