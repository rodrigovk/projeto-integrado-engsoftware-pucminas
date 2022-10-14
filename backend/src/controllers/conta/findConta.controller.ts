import { Request, Response } from "express";
import { FindContaByIdContaUseCase } from "@use-cases/conta";
import { BadRequestException } from "@shared/exceptions/httpException";

export class FindContaByIdContaController {
  constructor(
    private findContaByIdContaUseCase: FindContaByIdContaUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idConta: number = Number(request.params.id);

    if (isNaN(idConta)) {
      throw new BadRequestException("ID inválida.");
    }
    
    const conta = await this.findContaByIdContaUseCase.execute(idConta);

    return response.status(201).json(conta);
  }
}