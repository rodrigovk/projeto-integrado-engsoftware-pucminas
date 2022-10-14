import { Prisma, Usuario } from "@frameworks/database/prisma/client";
import { z } from "zod";

const usuarioCompleto = Prisma.validator<Prisma.UsuarioArgs>()({
  include: {
    administrador: true,
    cliente: true,
  },
});

type UsuarioCompleto = Prisma.UsuarioGetPayload<typeof usuarioCompleto>;

const UsuarioCreateSchema = z.object({
  email: z.string({ required_error: "E-mail não informado." }).email("E-mail inválido."),
  senha: z.string({ required_error: "Senha não informada." }).min(8, "Senha menor que 8 caractéres."),
});

const UsuarioAlterSchema = z.object({
  idUsuario: z.number({ required_error: "ID do usuário não informada." }),
  email: z.string().email("E-mail inválido.").optional(),
  senha: z.string().min(8, "Senha menor que 8 caractéres.").optional(),
})

type UsuarioCreate = z.infer<typeof UsuarioCreateSchema>;
type UsuarioAlter = z.infer<typeof UsuarioAlterSchema>;

export { Usuario, UsuarioCompleto, UsuarioCreateSchema, UsuarioAlterSchema, UsuarioCreate, UsuarioAlter };