import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Cliente, ClienteWithUser, ClienteCreate, ClienteAlter, ClienteSimples } from "@entities";
import { IClienteRepository } from "../cliente.repository";

export class PrismaClienteRepository implements IClienteRepository {

  async findByIdCliente(idCliente: number): Promise<ClienteWithUser | null> {
    return await prismaClient.cliente.findFirst({
      include: {
        usuario: {
          select: {
            idUsuario: true,
            email: true,
          }
        }
      },
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

  async findMany(includeUsuario: boolean): Promise<Cliente[]> {
    return await prismaClient.cliente.findMany({
      include: includeUsuario ? {
        usuario: {
          select: {
            idUsuario: true,
            email: true,
          }
        }
      } : null,
      orderBy: {
        nome: "asc",
      }
    });
  }

  async findManySimples(): Promise<ClienteSimples[]> {
    return await prismaClient.cliente.findMany({
      select: {
        idCliente: true,
        nome: true,
      },
      orderBy: {
        nome: "asc",
      }
    })
  }

  async create(cliente: ClienteCreate): Promise<Cliente> {
    return await prismaClient.cliente.create({
      data: {
        idUsuario: cliente.idUsuario,
        nome: cliente.nome,
        situacao: cliente.situacao,
        tipo: cliente.tipo,
        cnpjCpf: cliente.cnpjCpf,
      }
    });
  }

  async alter(cliente: ClienteAlter): Promise<Cliente> {
    const data: Prisma.ClienteUpdateInput = {
      nome: cliente.nome ? cliente.nome : undefined,
      situacao: cliente.situacao ? cliente.situacao : undefined,
      tipo: cliente.tipo ? cliente.tipo : undefined,
      cnpjCpf: cliente.cnpjCpf ? cliente.cnpjCpf : undefined,
    }

    return await prismaClient.cliente.update({
      where: {
        idCliente: cliente.idCliente,
      },
      data: data,
    });
  }

  async delete(idCliente: number): Promise<void> {
    await prismaClient.cliente.delete({
      where: {
        idCliente: idCliente,
      }
    })
  }

  async alterSituacao(idCliente: number, situacao: number): Promise<void> {
    await prismaClient.cliente.update({
      where: {
        idCliente: idCliente,
      },
      data: {
        situacao: situacao,
      }
    });
  }
}