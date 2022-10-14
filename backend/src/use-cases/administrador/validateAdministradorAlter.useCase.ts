import { IAdministradorRepository } from "@repositories/administrador.repository";
import { UsuarioAlter, AdministradorAlter } from "@entities";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";

export class ValidateAdministradorAlterUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) { }

  async execute(usuario: UsuarioAlter, administrador: AdministradorAlter): Promise<void> {
    if (!usuario.email && !usuario.senha && !administrador.nome && administrador.situacao == null) {
      throw new BadRequestException("Nenhum campo para alteração foi informado.");
    }

    return this.administradorRepository
      .findByIdAdministrador(administrador.idAdministrador)
      .then(_administrador => {
        if (!_administrador) {
          throw new NotFoundException("Administrador não encontrado.");
        }
      });
  }
}