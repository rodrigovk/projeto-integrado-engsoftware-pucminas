import { Assinatura } from "@frameworks/database/prisma/client";
import { z } from "zod";

enum AssinaturaSituacao {
  inativa = 0,
  ativa = 1,
}

const AssinaturaCreateSchema = z.object({
  idCliente: z.number({ required_error: "ID do cliente não informada." }),
  situacao: z.number({ required_error: "Situação não informada." }),
  descricao: z.string({ required_error: "Descrição não informada." }).min(5, "Descrição menor que 5 caractéres."),
  dataVencimento: z.preprocess(
    (arg) => {
      if (arg == null) return undefined;
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      throw new TypeError('Não foi possível interpretar o valor da Data de vencimento.');
    },
    z.date({ required_error: "Data de vencimento não informada." })),
  dataProximoVencimento: z.preprocess(
    (arg) => {
      if (arg == null) return undefined;
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      throw new TypeError('Não foi possível interpretar o valor da Data do próximo vencimento.');
    },
    z.date({ required_error: "Data do próximo vencimento não informada." })),
  valor: z.number({ required_error: "Valor não informado." }),
});

const AssinaturaAlterSchema = z.object({
  idAssinatura: z.number({ required_error: "ID da assinatura não informada." }),
  situacao: z.number().optional(),
  descricao: z.string().min(5, "Descrição menor que 5 caractéres.").optional(),
  dataVencimento: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    if (arg == null) return undefined;
    throw new TypeError('Não foi possível interpretar o valor da Data de vencimento.');
  }, z.date()).optional(),
  dataProximoVencimento: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    if (arg == null) return undefined;
    throw new TypeError('Não foi possível interpretar o valor da Data do próximo vencimento.');
  }, z.date()).optional(),
  valor: z.number().optional(),
});

type AssinaturaCreate = z.infer<typeof AssinaturaCreateSchema>;
type AssinaturaAlter = z.infer<typeof AssinaturaAlterSchema>;

export { Assinatura, AssinaturaSituacao, AssinaturaCreateSchema, AssinaturaCreate, AssinaturaAlterSchema, AssinaturaAlter };