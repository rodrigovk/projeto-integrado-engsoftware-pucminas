import { Request, Response } from "express";
import { EncloseContaUseCase } from "@use-cases/conta"; 
import { BadRequestException } from "@shared/exceptions/httpException";

export class EncloseContaController {
  constructor(
    private encloseContaUseCase: EncloseContaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idConta: number = Number(request.params.id);

    if (isNaN(idConta)) {
      throw new BadRequestException("ID inválida.");
    }

    await this.encloseContaUseCase.execute(idConta);

    return response.status(204).send();
  }
}