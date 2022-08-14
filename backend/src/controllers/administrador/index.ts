import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";

import { FindAdministradorByIdAdministradorUseCase, FindManyAdministradorUseCase, CreateAdministradorUseCase, ValidateAdministradorUseCase } from "@use-cases/administrador";

import { FindAdministradorByIdAdministradorController } from "./find-administrador.controller";
import { FindManyAdministradorController } from "./find-many-administrador.controller";
import { CreateAdministradorController } from "./create-administrador.controller";

const administradorRepository = new PrismaAdministradorRepository();

const findAdministradorByIdAdministradorController = new FindAdministradorByIdAdministradorController(new FindAdministradorByIdAdministradorUseCase(administradorRepository));
const findManyAdministradorController = new FindManyAdministradorController(new FindManyAdministradorUseCase(administradorRepository));
const createAdministradorController = new CreateAdministradorController(new CreateAdministradorUseCase(administradorRepository), new ValidateAdministradorUseCase(administradorRepository));

export { findAdministradorByIdAdministradorController, findManyAdministradorController, createAdministradorController }