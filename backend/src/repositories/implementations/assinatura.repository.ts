import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Assinatura, AssinaturaCreate, AssinaturaAlter } from "@entities";
import { IAssinaturaRepository } from "@repositories/assinatura.repository";

function getDataVencimentoProximo(): Date {
  // quantidade de assinaturas que têm a dataProximoVencimento dentro ou antes dos próximos 15 dias
  let data = new Date();
  data.setUTCDate(data.getUTCDate() + 15);
  return data;
}

export class PrismaAssinaturaRepository implements IAssinaturaRepository {
  async findByIdAssinatura(idAssinatura: number): Promise<Assinatura> {
    return await prismaClient.assinatura.findFirst({
      where: {
        idAssinatura,
      },
    });
  }
  async findMany(idCliente: number, includeCliente: boolean): Promise<Assinatura[]> {
    return await prismaClient.assinatura.findMany({
      include: {
        cliente: includeCliente,
      },
      where: {
        idCliente: idCliente || undefined,
      },
      orderBy: {
        idAssinatura: 'asc',
      }
    });
  }
  async findCountByIdCliente(idCliente: number): Promise<number> {
    return await prismaClient.assinatura.count({
      where: {
        idCliente,
      },
    });
  }
  async findCountVencimentoProximo(): Promise<number> {
    return await prismaClient.assinatura.count({
      where: {
        dataProximoVencimento: {
          lt: getDataVencimentoProximo(),
        }
      }
    });
  }
  async findManyVencimentoProximo(): Promise<Assinatura[]> {
    return await prismaClient.assinatura.findMany({
      where: {
        dataProximoVencimento: {
          lt: getDataVencimentoProximo(),
        }
      }
    });
  }
  async create(assinatura: AssinaturaCreate): Promise<Assinatura> {
    return await prismaClient.assinatura.create({
      data: {
        idCliente: assinatura.idCliente,
        descricao: assinatura.descricao,
        situacao: assinatura.situacao,
        dataVencimento: assinatura.dataVencimento,
        dataProximoVencimento: assinatura.dataProximoVencimento,
        valor: assinatura.valor,
      }
    });
  }
  async alter(assinatura: AssinaturaAlter): Promise<Assinatura> {
    const data: Prisma.AssinaturaUpdateInput = {
      descricao: assinatura.descricao ? assinatura.descricao : undefined,
      situacao: assinatura.situacao ? assinatura.situacao : undefined,
      dataVencimento: assinatura.dataVencimento ? assinatura.dataVencimento : undefined,
      dataProximoVencimento: assinatura.dataProximoVencimento ? assinatura.dataProximoVencimento : undefined,
      valor: assinatura.valor ? assinatura.valor : undefined,
    }

    return await prismaClient.assinatura.update({
      where: {
        idAssinatura: assinatura.idAssinatura,
      },
      data: data,
    });
  }
  async delete(idAssinatura: number): Promise<void> {
    await prismaClient.assinatura.delete({
      where: {
        idAssinatura: idAssinatura,
      }
    })
  }
  async alterSituacao(idAssinatura: number, situacao: number): Promise<void> {
    await prismaClient.assinatura.update({
      where: {
        idAssinatura: idAssinatura,
      },
      data: {
        situacao: situacao,
      }
    });
  }
  async alterDataProximoVencimento(idAssinatura: number, dataProximoVencimento: Date): Promise<void> {
    await prismaClient.assinatura.update({
      where: {
        idAssinatura: idAssinatura,
      },
      data: {
        dataProximoVencimento: dataProximoVencimento,
      }
    });
  }
}