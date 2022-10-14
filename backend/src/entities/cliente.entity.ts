import { Prisma, Cliente } from "@frameworks/database/prisma/client";
import { z } from "zod";

const clienteSimples = Prisma.validator<Prisma.ClienteArgs>()({
  select: {
    idCliente: true,
    nome: true,
  },
});

const clienteWithUser = Prisma.validator<Prisma.ClienteArgs>()({
  include: {
    usuario: {
      select: {
        idUsuario: true,
        email: true,
      }
    }
  },
});

type ClienteSimples = Prisma.ClienteGetPayload<typeof clienteSimples>;
type ClienteWithUser = Prisma.ClienteGetPayload<typeof clienteWithUser>;

enum ClienteSituacao {
  inativo = 0,
  ativo = 1,
}

const ClienteCreateSchema = z.object({
  idUsuario: z.number({ required_error: "ID do usuário não informada." }),
  nome: z.string({ required_error: "Nome não informado." }).min(5, "Nome menor que 5 caractéres."),
  situacao: z.number({ required_error: "Situação não informada." }),
  tipo: z.number({ required_error: "Tipo não informado." }),
  cnpjCpf: z.string({ required_error: "CNPJ/CPF não informado." }),
});

const ClienteAlterSchema = z.object({
  idCliente: z.number({ required_error: "ID do cliente não informada." }),
  nome: z.string().min(5, "Nome menor que 5 caractéres.").optional(),
  situacao: z.number().optional(),
  tipo: z.number().optional(),
  cnpjCpf: z.string().optional(),
});

type ClienteCreate = z.infer<typeof ClienteCreateSchema>;
type ClienteAlter = z.infer<typeof ClienteAlterSchema>;

export { Cliente, ClienteSimples, ClienteWithUser, ClienteSituacao, ClienteCreateSchema, ClienteAlterSchema, ClienteCreate, ClienteAlter };