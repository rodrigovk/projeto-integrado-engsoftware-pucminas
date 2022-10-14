import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";
import { PrismaAssinaturaRepository } from "@repositories/implementations/assinatura.repository";

import { ValidateUsuarioCreateUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase, AlterUsuarioUseCase } from "@use-cases/usuario";
import { FindClienteByIdClienteUseCase, FindManyClienteUseCase, CreateClienteUseCase, ValidateClienteCreateUseCase, ValidateClienteAlterUseCase, AlterClienteUseCase, DeleteClienteUseCase, AlterClienteSituacaoUseCase } from "@use-cases/cliente";
import { ValidateCnpjCpfUseCase } from "@use-cases/shared";

import { FindClienteByIdClienteController } from "./findCliente.controller";
import { FindManyClienteController } from "./findManyCliente.controller";
import { CreateClienteController } from "./createCliente.controller";
import { AlterClienteController } from "./alterCliente.controller";
import { DeleteClienteController } from "./deleteCliente.controller";
import { AlterClienteSituacaoController } from "./alterClienteSituacao.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();
const assinaturaRepository = new PrismaAssinaturaRepository();

const findClienteByIdClienteController = new FindClienteByIdClienteController(new FindClienteByIdClienteUseCase(clienteRepository));
const findManyClienteController = new FindManyClienteController(new FindManyClienteUseCase(clienteRepository));
const createClienteController = new CreateClienteController(new ValidateUsuarioCreateUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository), new DeleteUsuarioUseCase(usuarioRepository),
  new ValidateClienteCreateUseCase(clienteRepository, new ValidateCnpjCpfUseCase()), new CreateClienteUseCase(clienteRepository));
const alterClienteController = new AlterClienteController(new ValidateClienteAlterUseCase(clienteRepository, new ValidateCnpjCpfUseCase()), new AlterUsuarioUseCase(usuarioRepository),
  new AlterClienteUseCase(clienteRepository), new FindClienteByIdClienteUseCase(clienteRepository));
const deleteClienteController = new DeleteClienteController(new DeleteUsuarioUseCase(usuarioRepository), new FindClienteByIdClienteUseCase(clienteRepository), new DeleteClienteUseCase(clienteRepository, ticketRepository, assinaturaRepository));
const alterClienteSituacaoController = new AlterClienteSituacaoController(new AlterClienteSituacaoUseCase(clienteRepository));

export { findClienteByIdClienteController, findManyClienteController, createClienteController, alterClienteController, deleteClienteController, alterClienteSituacaoController }