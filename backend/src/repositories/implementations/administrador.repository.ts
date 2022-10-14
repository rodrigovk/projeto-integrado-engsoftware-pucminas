import { Prisma, prismaClient } from "@frameworks/database/prisma/client";
import { Administrador, AdministradorWithUser, AdministradorCreate, AdministradorAlter } from "@entities";
import { IAdministradorRepository } from "../administrador.repository";

export class PrismaAdministradorRepository implements IAdministradorRepository {
  async findByIdAdministrador(idAdministrador: number): Promise<AdministradorWithUser | null> {
    return await prismaClient.administrador.findFirst({
      include: {
        usuario: {
          select: {
            idUsuario: true,
            email: true,
          }
        }
      },
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
  async findMany(includeUsuario: boolean): Promise<Administrador[]> {
    const _include: Prisma.AdministradorInclude = {
      usuario: {
        select: {
          idUsuario: true,
          email: true,
        },
      }
    }
    return await prismaClient.administrador.findMany({
      include: includeUsuario ? _include : null,
      orderBy: {
        nome: "asc",
      }
    });
  }
  async create(administrador: AdministradorCreate): Promise<Administrador> {
    return await prismaClient.administrador.create({
      data: {
        idUsuario: administrador.idUsuario,
        nome: administrador.nome,
        situacao: administrador.situacao,
      }
    });
  }
  async alter(administrador: AdministradorAlter): Promise<Administrador> {
    const data: Prisma.AdministradorUpdateInput = {
      nome: administrador.nome ? administrador.nome : undefined,
      situacao: administrador.situacao ? administrador.situacao : undefined,
    }
    //(Prisma.Without<Prisma.AdministradorUpdateInput, Prisma.AdministradorUncheckedUpdateInput> & Prisma.AdministradorUncheckedUpdateInput) | (Prisma.Without<...> & Prisma.AdministradorUpdateInput)

    return await prismaClient.administrador.update({
      where: {
        idAdministrador: administrador.idAdministrador,
      },
      data: data,
    });
  }
  async delete(idAdministrador: number): Promise<void> {
    await prismaClient.administrador.delete({
      where: {
        idAdministrador: idAdministrador,
      }
    })
  }
  async alterSituacao(idAdministrador: number, situacao: number): Promise<void> {
    await prismaClient.administrador.update({
      where: {
        idAdministrador: idAdministrador,
      },
      data: {
        situacao: situacao,
      }
    });
  }
}