import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";

import { ValidateUsuarioUseCase, FindUsuarioByIdUsuarioUseCase, FindManyUsuarioByIdUsuarioUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase } from "@use-cases/usuario";

import { FindUsuarioByIdUsuarioController } from "./find-usuario.controller";
import { FindManyUsuarioByIdUsuarioController } from "./find-many.usuario.controller";
import { CreateUsuarioController } from "./create-usuario.controller";
import { DeleteUsuarioController } from "./delete-usuario.controller";

const usuarioRepository = new PrismaUsuarioRepository();

const findUsuarioByIdUsuarioController = new FindUsuarioByIdUsuarioController(new FindUsuarioByIdUsuarioUseCase(usuarioRepository));
const findManyUsuarioByIdUsuarioController = new FindManyUsuarioByIdUsuarioController(new FindManyUsuarioByIdUsuarioUseCase(usuarioRepository));
const createUsuarioController = new CreateUsuarioController(new ValidateUsuarioUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository));
const deleteUsuarioController = new DeleteUsuarioController(new DeleteUsuarioUseCase(usuarioRepository));

export { findUsuarioByIdUsuarioController, findManyUsuarioByIdUsuarioController, createUsuarioController, deleteUsuarioController }