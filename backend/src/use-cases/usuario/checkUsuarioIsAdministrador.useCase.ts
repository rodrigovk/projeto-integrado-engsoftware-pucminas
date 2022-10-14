import { IAdministradorRepository } from "@repositories/administrador.repository";

export class CheckUsuarioIsAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(idUsuario: number) : Promise<boolean> {
    return this.administradorRepository
      .findByIdUsuario(idUsuario)
      .then((administrador) => {
        return (!!administrador);
      });
  }
}