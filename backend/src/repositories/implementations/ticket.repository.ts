import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Ticket, TicketResposta, TicketSituacao } from "@entities";
import { ITicketRepository } from "../ticket.repository";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class PrismaTicketRepository implements ITicketRepository {

  async findByIdTicket(idTicket: number): Promise<Ticket | null> {
    return await prismaClient.ticket.findFirst({
      where: {
        idTicket,
      },
      include: {
        respostas: {
          include: {
            ticket: false,
            administrador: {
              select: {
                idAdministrador: true,
                situacao: true,
                nome: true,
              }
            },
            cliente: {
              select: {
                idCliente: true,
                situacao: true,
                nome: true,
              }
            }
          }
        }
      }
    });
  }

  async findManyByIdCliente(idCliente: number): Promise<Ticket[]> {
    return await prismaClient.ticket.findMany({
      where: {
        idCliente
      },
      orderBy: {
        dataCriacao: 'desc',
      }
    });
  }

  async findMany(): Promise<Ticket[]> {
    return await prismaClient.ticket.findMany({
      orderBy: {
        dataCriacao: 'desc',
      }
    });
  }

  async findCountAguardandoResposta(): Promise<number> {
    // retorno o ticket (idTicket) + respostas (idResposta + idCliente) dos tickets que estão em (situacao = aberto) e possuem alguma resposta com (idCliente <> null) ou não possuem nenhuma resposta
    const tickets = await prismaClient.ticket.findMany({
      select: {
        idTicket: true,
        respostas: {
          select: {
            idResposta: true,
            idCliente: true
          },
          orderBy: {
            idResposta: 'desc'
          }
        }
      },
      where: {
        situacao: TicketSituacao.aberto,
        OR: [
          {
            respostas: {
              none: {}
            }
          },
          {
            respostas: {
              some: {
                idCliente: {
                  not: null
                }
              }
            }
          }
        ]
      }
    });

    // somo a quantidade dos tickets:
    //   com a última resposta criada pelo cliente
    //   e sem nenhuma resposta
    const count =
      tickets.filter(ticket => {
        return ticket.respostas.findIndex(resposta => {
          return (resposta.idCliente != null);
        }) === 0;
      }).concat(
        tickets.filter(ticket => {
          return ticket.respostas.length === 0;
        })
      ).length;

    return count;
  }

  async findCountRespondido(idCliente: number): Promise<number> {
    // retorno o ticket (idTicket) + respostas (idResposta + idAdministrador) dos tickets que estão em (situacao = aberto) e possuem alguma resposta com (idAdministrador <> null)
    const tickets = await prismaClient.ticket.findMany({
      select: {
        idTicket: true,
        respostas: {
          select: {
            idResposta: true,
            idAdministrador: true
          },
          orderBy: {
            idResposta: 'desc'
          }
        }
      },
      where: {
        situacao: TicketSituacao.aberto,
        idCliente: idCliente,
        respostas: {
          some: {
            idAdministrador: {
              not: null
            }
          }
        }
      }
    });

    // somo a quantidade dos tickets com a última resposta criada por um administrador
    const count =
      tickets.filter(ticket => {
        return ticket.respostas.findIndex(resposta => {
          return (resposta.idAdministrador != null);
        }) === 0;
      }).length;

    return count;
  }

  async create(ticket: Ticket): Promise<Ticket> {
    return await prismaClient.ticket.create({ data: ticket });
  }

  async alterSituacao(idTicket: number, situacao: number): Promise<void> {
    await prismaClient.ticket.update({
      where: {
        idTicket: idTicket,
      },
      data: {
        situacao: situacao,
      }
    });
  }

  async delete(idTicket: number): Promise<void> {
    try {
      await prismaClient.ticket.delete({
        where: {
          idTicket
        }
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          throw new BadRequestException("Ticket não encontrado.");
        }
      }
      throw err;
    }
  }

  async findRespostaByIdTicketIdResposta(idTicket: number, idResposta: number): Promise<TicketResposta> {
    return await prismaClient.ticketResposta.findFirst({
      where: {
        idTicket,
        idResposta,
      },
      include: {
        administrador: {
          select: {
            idAdministrador: true,
            situacao: true,
            nome: true,
          }
        },
        cliente: {
          select: {
            idCliente: true,
            situacao: true,
            nome: true,
          }
        }
      }
    });
  }

  async createResposta(ticketResposta: TicketResposta): Promise<TicketResposta> {
    return await prismaClient.ticketResposta.create({
      data: ticketResposta
    })
  }
}