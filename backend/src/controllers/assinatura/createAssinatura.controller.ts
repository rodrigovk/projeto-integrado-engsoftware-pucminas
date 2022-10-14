import { Request, Response } from "express";
import { AssinaturaSituacao, AssinaturaCreateSchema, AssinaturaCreate } from "@entities";
import { CreateAssinaturaUseCase, ValidateAssinaturaCreateUseCase } from "@use-cases/assinatura"; 
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateAssinaturaController {
  constructor(
    private validateAssinaturaCreateUseCase: ValidateAssinaturaCreateUseCase,
    private createAssinaturaUseCase: CreateAssinaturaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);

    const assinaturaCreate: AssinaturaCreate = AssinaturaCreateSchema.parse({ ...request.body, situacao: AssinaturaSituacao.ativa });

    await this.validateAssinaturaCreateUseCase.execute(assinaturaCreate);

    const assinaturaCriado = await this.createAssinaturaUseCase.execute(assinaturaCreate);

    return response.status(200).json(assinaturaCriado);
  }
}