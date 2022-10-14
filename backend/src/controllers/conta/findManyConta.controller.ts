import { Request, Response } from "express";
import { ContaSituacao, UsuarioCompleto } from "@entities";
import { AuthUseCase } from "@use-cases/auth";
import { FindManyContaUseCase } from "@use-cases/conta";
import { ValidateContaSituacaoUseCase } from "@use-cases/conta";

export class FindManyContaController {
  constructor(
    private authUseCase: AuthUseCase,
    private findManyContaUseCase: FindManyContaUseCase,
    private validateContaSituacaoUseCase: ValidateContaSituacaoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {  
    const includeCliente: boolean = (request.query.includeCliente === "true");

    const auth = (request as any).auth;
    const usuario: UsuarioCompleto = await this.authUseCase.execute(auth.user, auth.password);

    let idCliente: number = usuario.cliente ? usuario.cliente.idCliente : null;
    if (idCliente == null) {
      let idClienteQuery = parseInt(request.query.idCliente as string);
      if (Number.isNaN(idClienteQuery)) {
        idClienteQuery = null;
      }
      idCliente = idClienteQuery;
    }

    let situacao: ContaSituacao = parseInt(request.query.situacao as string);
    if (!Number.isNaN(situacao)) {
      await this.validateContaSituacaoUseCase.execute(situacao);
    } else {
      situacao = null;
    }

    const contas = await this.findManyContaUseCase.execute(idCliente, situacao, includeCliente);

    return response.status(200).json(contas);
  }
}