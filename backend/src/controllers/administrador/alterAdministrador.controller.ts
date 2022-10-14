import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "@shared/exceptions/httpException";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";
import {
  UsuarioAlterSchema, UsuarioAlter,
  AdministradorAlterSchema, AdministradorAlter
} from "@entities";
import { AlterUsuarioUseCase } from "@use-cases/usuario";
import { ValidateAdministradorAlterUseCase, AlterAdministradorUseCase, FindAdministradorByIdAdministradorUseCase } from "@use-cases/administrador";

export class AlterAdministradorController {
  constructor(
    private validateAdministradorAlterUseCase: ValidateAdministradorAlterUseCase,
    private alterUsuarioUseCase: AlterUsuarioUseCase,
    private alterAdministradorUseCase: AlterAdministradorUseCase,
    private findAdministradorByIdAdministradorUseCase: FindAdministradorByIdAdministradorUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idAdministrador: number = Number(request.params.id);

    if (isNaN(idAdministrador)) {
      throw new BadRequestException("ID inválida.");
    }

    validateRequestBodyJson(request);
    
    const administrador = await this.findAdministradorByIdAdministradorUseCase.execute(idAdministrador);
    if (!administrador) {
      throw new NotFoundException("Administrador não encontrado.");
    }

    const usuarioAlter: UsuarioAlter = UsuarioAlterSchema.parse({ idUsuario: administrador.usuario.idUsuario, ...request.body });
    const administradorAlter: AdministradorAlter = AdministradorAlterSchema.parse({ idAdministrador, ...request.body });

    await this.validateAdministradorAlterUseCase.execute(usuarioAlter, administradorAlter);

    await this.alterUsuarioUseCase.execute(usuarioAlter);
    await this.alterAdministradorUseCase.execute(administradorAlter);

    const administradorAlterado = await this.findAdministradorByIdAdministradorUseCase.execute(idAdministrador);

    return response.status(200).json(administradorAlterado);
  }
}