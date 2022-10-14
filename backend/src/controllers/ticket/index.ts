import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";
import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";

import { NodemailerEmailService } from "@frameworks/mail-services/nodemaillerEmailService";

import { AuthUseCase } from "@use-cases/auth";
import { ValidateTicketUseCase, ValidateTicketSituacaoUseCase, FindTicketByIdTicketUseCase, FindManyTicketUseCase, FindManyTicketByIdClienteUseCase, CreateTicketUseCase, AlterTicketSituacaoUseCase,
  ValidateTicketRespostaUseCase, CreateTicketRespostaUseCase } from "@use-cases/ticket";
import { FindClienteByIdClienteUseCase } from "@use-cases/cliente/findCliente.useCase";
import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/findUsuario.useCase";
import { SendEmailUseCase } from "@use-cases/mail-services/sendEmail.useCase";

import { FindTicketByIdTicketController } from "./findTicket.controller";
import { FindManyTicketController } from "./findManyTicket.controller";
import { FindManyTicketByIdClienteController } from "./findManyTicketIdCliente.controller";
import { CreateTicketController } from "./createTicket.controller";
import { AlterTicketSituacaoController } from "./alterTicketSituacao.controller";
import { CreateTicketRespostaController } from "./resposta/createTicketResposta.controller";

const usuarioRepository = new PrismaUsuarioRepository();
const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();

const findTicketByIdTicketController = new FindTicketByIdTicketController(new AuthUseCase(usuarioRepository), new FindTicketByIdTicketUseCase(ticketRepository));
const findManyTicketController = new FindManyTicketController(new AuthUseCase(usuarioRepository), new FindManyTicketUseCase(ticketRepository), new ValidateTicketSituacaoUseCase());
const findManyTicketByIdClienteController = new FindManyTicketByIdClienteController(new FindManyTicketByIdClienteUseCase(ticketRepository), new ValidateTicketSituacaoUseCase());
const createTicketController = new CreateTicketController(new ValidateTicketUseCase(clienteRepository), new CreateTicketUseCase(ticketRepository));
const alterTicketSituacaoController = new AlterTicketSituacaoController(new AuthUseCase(usuarioRepository), new FindTicketByIdTicketUseCase(ticketRepository), new AlterTicketSituacaoUseCase(ticketRepository), new ValidateTicketSituacaoUseCase());

const createTicketRespostaController = new CreateTicketRespostaController(new CreateTicketRespostaUseCase(ticketRepository), new ValidateTicketRespostaUseCase(administradorRepository, clienteRepository, ticketRepository), new FindTicketByIdTicketUseCase(ticketRepository),
  new FindClienteByIdClienteUseCase(clienteRepository), new FindUsuarioByIdUsuarioUseCase(usuarioRepository), new SendEmailUseCase(new NodemailerEmailService()));

export { findTicketByIdTicketController, findManyTicketController, findManyTicketByIdClienteController, createTicketController, alterTicketSituacaoController, 
  createTicketRespostaController }