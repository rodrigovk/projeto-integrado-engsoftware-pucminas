import { prismaClient } from "@frameworks/database/prisma/client";
import { Cliente } from "@entities";
import { IClienteRepository } from "../cliente.repository";

export class PrismaClienteRepository implements IClienteRepository { 

  async findByIdCliente(idCliente: number): Promise<Cliente | null> {
    return await prismaClient.cliente.findFirst({
      where: {
        idCliente,
      },
    });
  }

  async create(cliente: Cliente): Promise<void> {
    await prismaClient.cliente.create({ data: cliente });
  }
}