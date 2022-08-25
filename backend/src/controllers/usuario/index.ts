import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";

import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente";
import { ValidateUsuarioUseCase, FindUsuarioByIdUsuarioUseCase, FindManyUsuarioByIdUsuarioUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase } from "@use-cases/usuario";
import { FindCountTicketAguardandoRespostaUseCase } from "@use-cases/ticket";
import { FindCountTicketRespondidoUseCase } from "@use-cases/ticket";

import { FindUsuarioByIdUsuarioController } from "./find-usuario.controller";
import { FindManyUsuarioByIdUsuarioController } from "./find-many.usuario.controller";
import { CreateUsuarioController } from "./create-usuario.controller";
import { DeleteUsuarioController } from "./delete-usuario.controller";
import { GetDashInfoController } from "./get-dash-info.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();

const findUsuarioByIdUsuarioController = new FindUsuarioByIdUsuarioController(new FindUsuarioByIdUsuarioUseCase(usuarioRepository));
const findManyUsuarioByIdUsuarioController = new FindManyUsuarioByIdUsuarioController(new FindManyUsuarioByIdUsuarioUseCase(usuarioRepository));
const createUsuarioController = new CreateUsuarioController(new ValidateUsuarioUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository));
const deleteUsuarioController = new DeleteUsuarioController(new DeleteUsuarioUseCase(usuarioRepository));
const getDashInfoController = new GetDashInfoController(new FindAdministradorByIdUsuarioUseCase(administradorRepository), new FindClienteByIdUsuarioUseCase(clienteRepository), 
  new FindCountTicketAguardandoRespostaUseCase(ticketRepository), new FindCountTicketRespondidoUseCase(ticketRepository));

export { findUsuarioByIdUsuarioController, findManyUsuarioByIdUsuarioController, createUsuarioController, deleteUsuarioController, getDashInfoController }