import { prismaClient } from "@frameworks/database/prisma/client";
import { Conta, ContaCreate, ContaSituacao } from "@entities";
import { IContaRepository } from "@repositories/conta.repository";
import { Decimal } from "@prisma/client/runtime/index";

export class PrismaContaRepository implements IContaRepository {
  async findByIdConta(idConta: number): Promise<Conta> {
    return await prismaClient.conta.findFirst({
      where: {
        idConta,
      },
    });
  }
  async findMany(idCliente: number, situacao: number, includeCliente: boolean): Promise<Conta[]> {
    return await prismaClient.conta.findMany({
      include: {
        cliente: includeCliente,
      },
      where: {
        idCliente: idCliente || undefined,
        situacao: (situacao != null) ? situacao : undefined,
      },
      orderBy: {
        dataVencimento: "asc",
      }
    });
  }
  async create(conta: ContaCreate): Promise<Conta> {
    return await prismaClient.conta.create({
      data: {
        idAssinatura: conta.idAssinatura,
        idCliente: conta.idCliente,
        situacao: conta.situacao,
        dataVencimento: conta.dataVencimento,
        valor: conta.valor,
      }
    });
  }
  async findCountByIdAssinatura(idAssinatura: number): Promise<number> {
    return await prismaClient.conta.count({
      where: {
        idAssinatura,
      }
    })
  }
  async findCountVencida(idCliente: number): Promise<number> {
    return await prismaClient.conta.count({
      where: {
        situacao: 0,
        idCliente: idCliente || undefined,
        dataVencimento: {
          lt: new Date(),
        }
      }
    });
  }
  async findAmountVencida(idCliente: number): Promise<Decimal> {
    const contas = await prismaClient.conta.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        situacao: 0,
        idCliente: idCliente || undefined,
        dataVencimento: {
          lt: new Date(),
        }
      }
    });
    return contas._sum.valor;
  }
  async enclose(idConta: number): Promise<void> {
    await prismaClient.conta.update({
      data: {
        situacao: ContaSituacao.paga,
      },
      where: {
        idConta: idConta,
      }
    })
  }
}