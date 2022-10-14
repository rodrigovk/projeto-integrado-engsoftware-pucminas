import { Conta } from "@frameworks/database/prisma/client";
import { z } from "zod";

enum ContaSituacao {
  aberta = 0,
  paga = 1,
}

const ContaCreateSchema = z.object({
  idCliente: z.number({ required_error: "ID do cliente não informada." }),
  idAssinatura: z.number({ required_error: "ID da assinatura não informada." }),
  situacao: z.number({ required_error: "Situação não informada." }),
  dataVencimento: z.preprocess(
    (arg) => {
      if (arg == null) return undefined;
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      throw new TypeError("Não foi possível interpretar o valor da Data de vencimento.");
    },
    z.date({ required_error: "Data de vencimento não informada." })),
  valor: z.number({ required_error: "Valor não informado." }),
});

type ContaCreate = z.infer<typeof ContaCreateSchema>;

export { Conta, ContaSituacao, ContaCreateSchema, ContaCreate };