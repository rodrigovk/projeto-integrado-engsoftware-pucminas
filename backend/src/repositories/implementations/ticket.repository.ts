import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Ticket, TicketResposta } from "@entities";
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

  async createResposta(ticketResposta: TicketResposta): Promise<TicketResposta> {
    return await prismaClient.ticketResposta.create({
      data: ticketResposta
    })
  }
}