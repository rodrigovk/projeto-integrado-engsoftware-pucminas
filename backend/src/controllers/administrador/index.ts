import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";

import { FindAdministradorByIdAdministradorUseCase, FindManyAdministradorUseCase, ValidateAdministradorCreateUseCase, CreateAdministradorUseCase, AlterAdministradorSituacaoUseCase, ValidateAdministradorAlterUseCase, AlterAdministradorUseCase, DeleteAdministradorUseCase } from "@use-cases/administrador";
import { ValidateUsuarioCreateUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase, AlterUsuarioUseCase } from "@use-cases/usuario";

import { FindAdministradorByIdAdministradorController } from "./findAdministrador.controller";
import { FindManyAdministradorController } from "./findManyAdministrador.controller";
import { CreateAdministradorController } from "./createAdministrador.controller";
import { AlterAdministradorController } from "./alterAdministrador.controller";
import { DeleteAdministradorController } from "./deleteAdministrador.controller";
import { AlterAdministradorSituacaoController } from "./alterAdministradorSituacao.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const ticketRepository = new PrismaTicketRepository();

const findAdministradorByIdAdministradorController = new FindAdministradorByIdAdministradorController(new FindAdministradorByIdAdministradorUseCase(administradorRepository));
const findManyAdministradorController = new FindManyAdministradorController(new FindManyAdministradorUseCase(administradorRepository));
const createAdministradorController = new CreateAdministradorController(new ValidateUsuarioCreateUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository), new DeleteUsuarioUseCase(usuarioRepository),
  new CreateAdministradorUseCase(administradorRepository), new ValidateAdministradorCreateUseCase(administradorRepository));
const alterAdministradorController = new AlterAdministradorController(new ValidateAdministradorAlterUseCase(administradorRepository), new AlterUsuarioUseCase(usuarioRepository), 
  new AlterAdministradorUseCase(administradorRepository), new FindAdministradorByIdAdministradorUseCase(administradorRepository));
const deleteAdministradorController = new DeleteAdministradorController(new DeleteUsuarioUseCase(usuarioRepository), new FindAdministradorByIdAdministradorUseCase(administradorRepository), new DeleteAdministradorUseCase(administradorRepository, ticketRepository));
const alterAdministradorSituacaoController = new AlterAdministradorSituacaoController(new AlterAdministradorSituacaoUseCase(administradorRepository));

export { findAdministradorByIdAdministradorController, findManyAdministradorController, createAdministradorController, alterAdministradorController, deleteAdministradorController, alterAdministradorSituacaoController }