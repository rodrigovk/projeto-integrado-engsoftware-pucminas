import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";

import { AuthUseCase } from "@use-cases/auth";

import { AuthController } from "./auth.controller";

const usuarioRepository = new PrismaUsuarioRepository();

const authController = new AuthController(new AuthUseCase(usuarioRepository));

export { authController }