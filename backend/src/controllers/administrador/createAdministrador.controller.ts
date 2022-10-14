import { Request, Response } from "express";
import {
  UsuarioCreateSchema, UsuarioCreate,
  AdministradorSituacao, AdministradorCreateSchema, AdministradorCreate
} from "@entities";
import { CreateAdministradorUseCase, ValidateAdministradorCreateUseCase } from "@use-cases/administrador";
import { CreateUsuarioUseCase, DeleteUsuarioUseCase, ValidateUsuarioCreateUseCase } from "@use-cases/usuario";
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateAdministradorController {
  constructor(
    private validateUsuarioCreateUseCase: ValidateUsuarioCreateUseCase,
    private createUsuarioUseCase: CreateUsuarioUseCase,
    private deleteUsuarioUseCase: DeleteUsuarioUseCase,
    private createAdministradorUseCase: CreateAdministradorUseCase,
    private validateAdministradorCreateUseCase: ValidateAdministradorCreateUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);

    const usuarioCreate: UsuarioCreate = UsuarioCreateSchema.parse({ ...request.body });

    const administradorCreate: AdministradorCreate = AdministradorCreateSchema.parse({ idUsuario: 0, ...request.body, situacao: AdministradorSituacao.ativo });

    await this.validateUsuarioCreateUseCase.execute(usuarioCreate);

    const usuarioCriado = await this.createUsuarioUseCase.execute(usuarioCreate);
    administradorCreate.idUsuario = usuarioCriado.idUsuario;

    try {
      await this.validateAdministradorCreateUseCase.execute(administradorCreate);

      const administradorCriado = await this.createAdministradorUseCase.execute(administradorCreate);

      return response.status(200).json(administradorCriado);
    } catch (err) {
      await this.deleteUsuarioUseCase.execute(usuarioCriado.idUsuario);
      throw err;
    }
  }
}