import { Prisma, PrismaClient, 
  Usuario, 
  Administrador, Cliente, 
  Ticket, TicketResposta } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export { Prisma, prismaClient, 
  Usuario, 
  Administrador, Cliente, 
  Ticket, TicketResposta };