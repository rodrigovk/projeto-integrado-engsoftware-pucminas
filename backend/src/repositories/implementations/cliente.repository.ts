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
  
  async findByIdUsuario(idUsuario: number): Promise<Cliente | null> {
    return await prismaClient.cliente.findFirst({
      where: {
        idUsuario,
      },
    });
  }

  async findByCnpjCpf(cnpjCpf: string): Promise<Cliente | null> {
    return await prismaClient.cliente.findFirst({
      where: {
        cnpjCpf,
      },
    });
  }

  async findMany(): Promise<Cliente[]> {
    return await prismaClient.cliente.findMany({});
  }
  
  async create(cliente: Cliente): Promise<Cliente> {
    return await prismaClient.cliente.create({ data: cliente });
  }
}