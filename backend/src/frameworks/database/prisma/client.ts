import { PrismaClient, Usuario, Cliente } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export { prismaClient, Usuario, Cliente };