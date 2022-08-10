import { Cliente } from "@frameworks/database/prisma/client";

enum ClienteSituacao {
  inativo = 0,
  ativo = 1,
}

enum ClienteTipo {
  fisico = 0,
  juridico = 1,
}

export { Cliente, ClienteSituacao, ClienteTipo };