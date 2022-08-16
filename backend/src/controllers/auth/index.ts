import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador/find-administrador-id-usuario.use-case";

import { AuthUseCase } from "@use-cases/auth";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente/find-cliente-id-usuario.use-case";
//import { CheckUsuarioIsAdministradorUseCase } from "@use-cases/usuario";

import { AuthController } from "./auth.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();

const authController = new AuthController(new AuthUseCase(usuarioRepository), new FindAdministradorByIdUsuarioUseCase(administradorRepository), new FindClienteByIdUsuarioUseCase(clienteRepository));
//new CheckUsuarioIsAdministradorUseCase(administradorRepository)

export { authController }