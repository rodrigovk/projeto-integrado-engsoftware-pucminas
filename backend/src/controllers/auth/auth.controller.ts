//import { Request, Response } from "express";
import { AuthUseCase } from "@use-cases/auth";

export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,
  ) {}

  async handle(email: string, senha: string): Promise<void> {
    // req.auth
    // const email: string = req.body.email;
    // const senha: string = req.body.senha;

    // if (!(await this.authUseCase.execute(email))) {
    //   throw new BadRequestException("Usuário não encontrado.");
    // }

    await this.authUseCase.execute(email, senha);

    //? return res.status(204).send();
  }
}