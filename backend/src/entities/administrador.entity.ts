import { Administrador } from "@frameworks/database/prisma/client";

enum AdministradorSituacao {
  inativo = 0,
  ativo = 1,
}

export { Administrador, AdministradorSituacao };