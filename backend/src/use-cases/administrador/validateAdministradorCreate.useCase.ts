import { IAdministradorRepository } from "@repositories/administrador.repository";
import { AdministradorCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateAdministradorCreateUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) { }

  async execute(administrador: AdministradorCreate): Promise<void> {
    if (administrador.idUsuario == null) {
      throw new BadRequestException("Usuário não informado.");
    }

    if (!administrador.nome) {
      throw new BadRequestException("Nome não informado.");
    }

    if (administrador.situacao == null) {
      throw new BadRequestException("Situação não informada.");
    }

    return this.administradorRepository
      .findByIdUsuario(administrador.idUsuario)
      .then((administradorComIdUsuario) => {
        if (administradorComIdUsuario) {
          throw new BadRequestException("Já existe um administrador linkado com o Usuário informado.");
        }
      });
  }
}