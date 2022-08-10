import { PrismaTicketRepository } from "@repositories/implementations/ticket.repository";

import { ValidateTicketUseCase, FindTicketByIdTicketUseCase, FindManyTicketByIdClienteUseCase, CreateTicketUseCase, CreateTicketRespostaUseCase } from "@use-cases/ticket";

import { FindTicketByIdTicketController } from "./find-ticket.controller";
import { FindManyTicketByIdClienteController } from "./find-many-ticket-id-cliente.controller";
import { CreateTicketController } from "./create-ticket.controller";
import { CreateTicketRespostaController } from "./create-ticket-resposta.controller";

import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";

const clienteRepository = new PrismaClienteRepository();
const ticketRepository = new PrismaTicketRepository();

const findTicketByIdTicketController = new FindTicketByIdTicketController(new FindTicketByIdTicketUseCase(ticketRepository));
const findManyTicketByIdTicketController = new FindManyTicketByIdClienteController(new FindManyTicketByIdClienteUseCase(ticketRepository));
const createTicketController = new CreateTicketController(new ValidateTicketUseCase(clienteRepository), new CreateTicketUseCase(ticketRepository));
const createTicketRespostaController = new CreateTicketRespostaController(new CreateTicketRespostaUseCase(ticketRepository));

export { findTicketByIdTicketController, findManyTicketByIdTicketController, createTicketController, createTicketRespostaController }