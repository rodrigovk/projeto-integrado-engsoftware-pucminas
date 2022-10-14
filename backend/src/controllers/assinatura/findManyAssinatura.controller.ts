import { Request, Response } from "express";
import { UsuarioCompleto } from "@entities";
import { AuthUseCase } from "@use-cases/auth";
import { FindManyAssinaturaUseCase } from "@use-cases/assinatura";

export class FindManyAssinaturaController {
  constructor(
    private authUseCase: AuthUseCase,
    private findManyAssinaturaUseCase: FindManyAssinaturaUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {  
    const includeCliente: boolean = (request.query.includeCliente === "true");

    const auth = (request as any).auth;
    const usuario: UsuarioCompleto = await this.authUseCase.execute(auth.user, auth.password);

    const idCliente: number = usuario.cliente ? usuario.cliente.idCliente : null;

    const assinaturas = await this.findManyAssinaturaUseCase.execute(idCliente, includeCliente);

    return response.status(200).json(assinaturas);
  }
}