import { IAdministradorRepository } from "@repositories/administrador.repository";
import { Administrador } from "@entities";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class ValidateAdministradorUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(administrador: Administrador) : Promise<void> {
    // if (!administrador.idAdministrador) {
    //   throw new BadRequestException("ID não informada."); 
    // }

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