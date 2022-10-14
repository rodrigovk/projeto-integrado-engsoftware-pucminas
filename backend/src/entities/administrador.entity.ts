import { Prisma, Administrador } from "@frameworks/database/prisma/client";
import { z } from "zod";

const administradorWithUser = Prisma.validator<Prisma.AdministradorArgs>()({
  include: {
    usuario: {
      select: {
        idUsuario: true,
        email: true,
      }
    }
  },
});

type AdministradorWithUser = Prisma.AdministradorGetPayload<typeof administradorWithUser>;

enum AdministradorSituacao {
  inativo = 0,
  ativo = 1,
}

const AdministradorCreateSchema = z.object({
  idUsuario: z.number({ required_error: "ID do usuário não informada." }),
  nome: z.string({ required_error: "Nome não informado." }).min(5, "Nome menor que 5 caractéres."),
  situacao: z.number({ required_error: "Situação não informada." }),
});

const AdministradorAlterSchema = z.object({
  idAdministrador: z.number({ required_error: "ID do administrador não informada." }),
  nome: z.string().min(5, "Nome menor que 5 caractéres.").optional(),
  situacao: z.number().optional(),
});

type AdministradorCreate = z.infer<typeof AdministradorCreateSchema>;
type AdministradorAlter = z.infer<typeof AdministradorAlterSchema>;

export { Administrador, AdministradorWithUser, AdministradorSituacao, AdministradorCreateSchema, AdministradorAlterSchema, AdministradorCreate, AdministradorAlter };