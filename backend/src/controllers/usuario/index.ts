import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";

import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/find-usuario.use-case";
import { FindUsuarioByIdUsuarioController } from "./find-usuario.controller";

import { ValidateUsuarioUseCase, CreateUsuarioUseCase } from "@use-cases/usuario";
import { CreateUsuarioController } from "./create-usuario.controller";

const usuarioRepository = new PrismaUsuarioRepository();

const findUsuarioByIdUsuarioController = new FindUsuarioByIdUsuarioController(new FindUsuarioByIdUsuarioUseCase(usuarioRepository));
const createUsuarioController = new CreateUsuarioController(new ValidateUsuarioUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository));

export { createUsuarioController, findUsuarioByIdUsuarioController }