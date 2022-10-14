import {
  Prisma, PrismaClient,
  Usuario,
  Administrador, Cliente,
  Ticket, TicketResposta,
  Assinatura,
  Conta,
} from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export {
  Prisma, prismaClient,
  Usuario,
  Administrador, Cliente,
  Ticket, TicketResposta,
  Assinatura,
  Conta,
};