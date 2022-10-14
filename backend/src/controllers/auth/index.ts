import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador/findAdministradorIdUsuario.useCase";

import { AuthUseCase } from "@use-cases/auth";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente/findClienteIdUsuario.useCase";

import { AuthController } from "./auth.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();

const authController = new AuthController(new AuthUseCase(usuarioRepository), new FindAdministradorByIdUsuarioUseCase(administradorRepository), new FindClienteByIdUsuarioUseCase(clienteRepository));

export { authController }