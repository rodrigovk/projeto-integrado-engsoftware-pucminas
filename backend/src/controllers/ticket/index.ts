import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";

import { ValidateTicketUseCase, FindTicketByIdTicketUseCase, FindManyTicketUseCase, FindManyTicketByIdClienteUseCase, CreateTicketUseCase, AlterTicketSituacaoUseCase,
  ValidateTicketRespostaUseCase, CreateTicketRespostaUseCase } from "@use-cases/ticket";

import { FindTicketByIdTicketController } from "./find-ticket.controller";
import { FindManyTicketController } from "./find-many-ticket.controller";
import { FindManyTicketByIdClienteController } from "./find-many-ticket-id-cliente.controller";
import { CreateTicketController } from "./create-ticket.controller";
import { AlterTicketSituacaoController } from "./alter-ticket-situacao.controller";
import { CreateTicketRespostaController } from "./resposta/create-ticket-resposta.controller";

import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaAdministradorRepository } from "@repositories/implementations/administrador.repository";

const administradorRepository = new PrismaAdministradorRepository();
const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();

const findTicketByIdTicketController = new FindTicketByIdTicketController(new FindTicketByIdTicketUseCase(ticketRepository));
const findManyTicketController = new FindManyTicketController(new FindManyTicketUseCase(ticketRepository));
const findManyTicketByIdClienteController = new FindManyTicketByIdClienteController(new FindManyTicketByIdClienteUseCase(ticketRepository));
const createTicketController = new CreateTicketController(new ValidateTicketUseCase(clienteRepository), new CreateTicketUseCase(ticketRepository));
const alterTicketSituacaoController = new AlterTicketSituacaoController(new AlterTicketSituacaoUseCase(ticketRepository));

const createTicketRespostaController = new CreateTicketRespostaController(new CreateTicketRespostaUseCase(ticketRepository), new ValidateTicketRespostaUseCase(administradorRepository, clienteRepository, ticketRepository));

export { findTicketByIdTicketController, findManyTicketController, findManyTicketByIdClienteController, createTicketController, alterTicketSituacaoController, createTicketRespostaController }