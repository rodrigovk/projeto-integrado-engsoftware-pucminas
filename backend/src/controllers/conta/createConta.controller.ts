import { Request, Response } from "express";
import { ContaSituacao, ContaCreateSchema, ContaCreate } from "@entities";
import { CreateContaUseCase, ValidateContaCreateUseCase } from "@use-cases/conta"; 
import validateRequestBodyJson from "@frameworks/webserver/validateRequestBodyJson";

export class CreateContaController {
  constructor(
    private validateContaCreateUseCase: ValidateContaCreateUseCase,
    private createContaUseCase: CreateContaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);

    const contaCreate: ContaCreate = ContaCreateSchema.parse({ ...request.body, situacao: ContaSituacao.aberta });

    await this.validateContaCreateUseCase.execute(contaCreate);

    const contaCriado = await this.createContaUseCase.execute(contaCreate);

    return response.status(200).json(contaCriado);
  }
}