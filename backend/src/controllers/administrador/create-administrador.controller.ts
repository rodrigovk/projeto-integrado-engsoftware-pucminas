import { Request, Response } from "express";
import { Administrador, AdministradorSituacao } from "@entities";
import { CreateAdministradorUseCase, ValidateAdministradorUseCase } from "@use-cases/administrador";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";

export class CreateAdministradorController {
  constructor(
    private createAdministradorUseCase: CreateAdministradorUseCase,
    private validateAdministradorUseCase: ValidateAdministradorUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const administrador: Administrador = request.body;

    administrador.situacao = AdministradorSituacao.ativo;

    await this.validateAdministradorUseCase.execute(administrador);

    const administradorCriado = await this.createAdministradorUseCase.execute(administrador);

    return response.status(200).json(administradorCriado);
  }
}