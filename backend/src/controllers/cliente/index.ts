import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";

import { FindClienteByIdClienteUseCase, FindManyClienteUseCase, CreateClienteUseCase, ValidateClienteUseCase } from "@use-cases/cliente";

import { FindClienteByIdClienteController } from "./find-cliente.controller";
import { FindManyClienteController } from "./find-many-cliente.controller";
import { CreateClienteController } from "./create-cliente.controller";

const clienteRepository = new PrismaClienteRepository();

const findClienteByIdClienteController = new FindClienteByIdClienteController(new FindClienteByIdClienteUseCase(clienteRepository));
const findManyClienteController = new FindManyClienteController(new FindManyClienteUseCase(clienteRepository));
const createClienteController = new CreateClienteController(new CreateClienteUseCase(clienteRepository), new ValidateClienteUseCase(clienteRepository));

export { findClienteByIdClienteController, findManyClienteController, createClienteController }