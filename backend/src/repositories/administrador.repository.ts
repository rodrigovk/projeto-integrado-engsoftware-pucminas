import { Administrador } from "@entities";

export interface IAdministradorRepository {
  findByIdAdministrador(idAdministrador: number): Promise<Administrador | null>;
  findByIdUsuario(idUsuario: number): Promise<Administrador | null>;
  findMany(): Promise<Administrador[]>;
  create(administrado: Administrador): Promise<Administrador>; 
}