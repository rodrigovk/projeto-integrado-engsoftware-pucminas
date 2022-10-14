import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaAssinaturaRepository } from "@repositories/implementations/assinatura.repository";
import { PrismaContaRepository } from "@repositories/implementations/conta.repository";

import { FindContaByIdContaUseCase, FindManyContaUseCase, ValidateContaCreateUseCase, CreateContaUseCase, EncloseContaUseCase, ValidateContaSituacaoUseCase, } from "@use-cases/conta";

import { FindContaByIdContaController } from "./findConta.controller";
import { FindManyContaController } from "./findManyConta.controller";
import { CreateContaController } from "./createConta.controller";
import { EncloseContaController } from "./encloseConta.controller";
import { AuthUseCase } from "@use-cases/auth/auth.useCase";

const usuarioRepository = new PrismaUsuarioRepository();
const clienteRepository = new PrismaClienteRepository();
const assinaturaRepository = new PrismaAssinaturaRepository();
const contaRepository = new PrismaContaRepository();

const findContaByIdContaController = new FindContaByIdContaController(new FindContaByIdContaUseCase(contaRepository));
const findManyContaController = new FindManyContaController(new AuthUseCase(usuarioRepository), new FindManyContaUseCase(contaRepository), new ValidateContaSituacaoUseCase());
const createContaController = new CreateContaController(new ValidateContaCreateUseCase(clienteRepository, assinaturaRepository), new CreateContaUseCase(contaRepository));
const encloseContaController = new EncloseContaController(new EncloseContaUseCase(contaRepository));

export {
  findContaByIdContaController, findManyContaController, createContaController, encloseContaController,
}