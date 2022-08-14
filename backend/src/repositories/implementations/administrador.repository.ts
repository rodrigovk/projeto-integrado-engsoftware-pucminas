import { prismaClient } from "@frameworks/database/prisma/client";
import { Administrador } from "@entities";
import { IAdministradorRepository } from "../administrador.repository";

export class PrismaAdministradorRepository implements IAdministradorRepository { 

  async findByIdAdministrador(idAdministrador: number): Promise<Administrador | null> {
    return await prismaClient.administrador.findFirst({
      where: {
        idAdministrador,
      },
    });
  }
  
  async findByIdUsuario(idUsuario: number): Promise<Administrador | null> {
    return await prismaClient.administrador.findFirst({
      where: {
        idUsuario,
      },
    });
  }

  async findMany(): Promise<Administrador[]> {
    return await prismaClient.administrador.findMany({});
  }
  
  async create(administrador: Administrador): Promise<Administrador> {
    return await prismaClient.administrador.create({ data: administrador });
  }
}