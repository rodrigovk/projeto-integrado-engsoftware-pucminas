import { prismaClient } from "@frameworks/database/prisma/client";
import { Usuario } from "@entities";
import { IUsuarioRepository } from "../usuario.repository";

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

  async create(usuario: Usuario): Promise<void> {
    await prismaClient.usuario.create({ data: usuario });
  }
}