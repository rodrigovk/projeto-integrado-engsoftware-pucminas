import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Usuario, UsuarioCompleto, UsuarioCreate, UsuarioAlter } from "@entities";
import { IUsuarioRepository } from "../usuario.repository";
import { BadRequestException } from "@shared/exceptions/httpException";

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

  async findCompletoByEmail(email: string): Promise<UsuarioCompleto | null> {
    return await prismaClient.usuario.findFirst({
      include: {
        administrador: true,
        cliente: true,
      },
      where: {
        email
      }
    })
  }

  async findMany(): Promise<Usuario[]> {
    return await prismaClient.usuario.findMany({
      orderBy: {
        email: "asc",
      }
    });
  }

  async create(usuario: UsuarioCreate): Promise<Usuario> {
    return await prismaClient.usuario.create({ data: {
      email: usuario.email,
      senha: usuario.senha,
    } });
  }

  async alter(usuario: UsuarioAlter): Promise<Usuario> {
    return await prismaClient.usuario.update({
      where: {
        idUsuario: usuario.idUsuario,
      },
      data: {
        email: usuario.email ? usuario.email : undefined,
        senha: usuario.senha ? usuario.senha : undefined,
      }
    })
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
        if (err.code === "P2025") {
          throw new BadRequestException("Usuário não encontrado.");
        }
      }
      throw err;
    }
  }
}