import { Prisma, PrismaClient, 
  Usuario, 
  Cliente, 
  Ticket, TicketResposta } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export { Prisma, prismaClient, 
  Usuario, 
  Cliente, 
  Ticket, TicketResposta };