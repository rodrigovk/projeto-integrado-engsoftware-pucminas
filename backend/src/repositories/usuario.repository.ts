import { Usuario } from "@entities";

export interface IUsuarioRepository {
  findByIdUsuario(idUsuario: number): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  create(usuario: Usuario): Promise<void>; 
}