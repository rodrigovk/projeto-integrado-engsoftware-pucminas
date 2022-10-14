import { Usuario, UsuarioCompleto, UsuarioCreate, UsuarioAlter } from "@entities";

export interface IUsuarioRepository {
  findByIdUsuario(idUsuario: number): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findCompletoByEmail(email: string): Promise<UsuarioCompleto | null>;
  findMany(): Promise<Usuario[]>;
  create(usuario: UsuarioCreate): Promise<Usuario>;
  alter(usuario: UsuarioAlter): Promise<Usuario>;
  delete(idUsuario: number): Promise<void>;
}