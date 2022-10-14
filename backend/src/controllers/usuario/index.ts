import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";
import { PrismaAssinaturaRepository } from "@repositories/implementations/assinatura.repository";
import { PrismaContaRepository } from "@repositories/implementations/conta.repository";

import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente";
import { ValidateUsuarioCreateUseCase, FindUsuarioByIdUsuarioUseCase, FindManyUsuarioUseCase, CreateUsuarioUseCase, DeleteUsuarioUseCase } from "@use-cases/usuario";
import { FindCountTicketAguardandoRespostaUseCase, FindCountTicketRespondidoByDateUseCase } from "@use-cases/ticket";
import { FindCountTicketRespondidoUseCase } from "@use-cases/ticket";
import { FindCountContaVencidaUseCase, FindAmountContaVencidaUseCase } from "@use-cases/conta";

import { FindUsuarioByIdUsuarioController } from "./findUsuario.controller";
import { FindManyUsuarioController } from "./findManyUsuario.controller";
import { CreateUsuarioController } from "./createUsuario.controller";
import { DeleteUsuarioController } from "./deleteUsuario.controller";
import { GetDashInfoController } from "./getDashInfo.controller";
import { FindCountAssinaturaVencimentoProximoUseCase } from "@use-cases/assinatura/findCountAssinaturaVencimentoProximo.useCase";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();
const assinaturaRepository = new PrismaAssinaturaRepository();
const contaRepository = new PrismaContaRepository();

const findUsuarioByIdUsuarioController = new FindUsuarioByIdUsuarioController(new FindUsuarioByIdUsuarioUseCase(usuarioRepository));
const findManyUsuarioByIdUsuarioController = new FindManyUsuarioController(new FindManyUsuarioUseCase(usuarioRepository));
const createUsuarioController = new CreateUsuarioController(new ValidateUsuarioCreateUseCase(usuarioRepository), new CreateUsuarioUseCase(usuarioRepository));
const deleteUsuarioController = new DeleteUsuarioController(new DeleteUsuarioUseCase(usuarioRepository));
const getDashInfoController = new GetDashInfoController(new FindAdministradorByIdUsuarioUseCase(administradorRepository), new FindClienteByIdUsuarioUseCase(clienteRepository), 
  new FindCountTicketAguardandoRespostaUseCase(ticketRepository), new FindCountAssinaturaVencimentoProximoUseCase(assinaturaRepository), new FindCountTicketRespondidoUseCase(ticketRepository), new FindCountTicketRespondidoByDateUseCase(ticketRepository),
  new FindCountContaVencidaUseCase(contaRepository), new FindAmountContaVencidaUseCase(contaRepository));

export { findUsuarioByIdUsuarioController, findManyUsuarioByIdUsuarioController, createUsuarioController, deleteUsuarioController, getDashInfoController }