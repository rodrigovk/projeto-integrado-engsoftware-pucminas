import { Usuario } from "@entities";

export interface IUsuarioRepository {
  findByIdUsuario(idUsuario: number): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findMany(): Promise<Usuario[]>;
  create(usuario: Usuario): Promise<Usuario>;
  delete(idUsuario: number): Promise<void>;
}