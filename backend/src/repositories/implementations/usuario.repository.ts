import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Usuario } from "@entities";
import { IUsuarioRepository } from "../usuario.repository";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class PrismaUsuarioRepository implements IUsuarioRepository { 

  async findByIdUsuario(idUsuario: number): Promise<Usuario | null> {
    return await prismaClient.usuario.findFirst({
      where: {
        idUsuario,
      },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await prismaClient.usuario.findFirst({
      where: {
        email
      }
    })
  }

  async findMany(): Promise<Usuario[]> {
    return await prismaClient.usuario.findMany({});
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return await prismaClient.usuario.create({ data: usuario });
  }

  async delete(idUsuario: number): Promise<void> {
    try {
      await prismaClient.usuario.delete({
        where: {
          idUsuario
        }
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new BadRequestException("Usuário não encontrado.");
        }
      }
      throw err;
    }
  }
}