//import { Request, Response } from "express";
import { AuthUseCase } from "@use-cases/auth";

export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,
  ) {}

  async handle(email: string, senha: string): Promise<void> {
    await this.authUseCase.execute(email, senha);

    //? return res.status(204).send();
  }
}