import { Administrador, AdministradorWithUser, AdministradorCreate, AdministradorAlter } from "@entities";

export interface IAdministradorRepository {
  findByIdAdministrador(idAdministrador: number): Promise<AdministradorWithUser | null>;
  findByIdUsuario(idUsuario: number): Promise<Administrador | null>;
  findMany(includeUsuario: boolean): Promise<Administrador[]>;
  create(administrador: AdministradorCreate): Promise<Administrador>;
  alter(administrador: AdministradorAlter): Promise<Administrador>;
  delete(idAdministrador: number): Promise<void>;
  alterSituacao(idAdministrador: number, situacao: number): Promise<void>;
}