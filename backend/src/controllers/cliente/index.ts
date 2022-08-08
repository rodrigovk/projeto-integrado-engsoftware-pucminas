import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";

import { FindClienteByIdClienteUseCase, CreateClienteUseCase } from "@use-cases/cliente";

import { FindClienteByIdClienteController } from "./find-cliente.controller";
import { CreateClienteController } from "./create-cliente.controller";

const findClienteByIdClienteController = new FindClienteByIdClienteController(new FindClienteByIdClienteUseCase(new PrismaClienteRepository()));
const createClienteController = new CreateClienteController(new CreateClienteUseCase(new PrismaClienteRepository()));

export { findClienteByIdClienteController, createClienteController }