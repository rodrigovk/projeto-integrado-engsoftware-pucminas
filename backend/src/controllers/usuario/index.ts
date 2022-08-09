import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";

import { ValidateUsuarioUseCase, FindUsuarioByIdUsuarioUseCase, CreateUsuarioUseCase } from "@use-cases/usuario";
import { FindUsuarioByIdUsuarioController } from "./find-usuario.controller";
import { CreateUsuarioController } from "./create-usuario.controller";

const usuarioRepository = new PrismaUsuarioRepository();

const findUsuarioByIdUsuarioController = new FindUsuarioByIdUsuarioController(new FindUsuarioByIdUsuarioUseCase(usuarioRepository));
const createUsuarioController = new CreateUsuarioController(new ValidateUsuarioUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository));

export { createUsuarioController, findUsuarioByIdUsuarioController }