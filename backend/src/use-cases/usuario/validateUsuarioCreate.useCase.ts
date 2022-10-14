import { IUsuarioRepository } from "@repositories/usuario.repository";
import { UsuarioCreate } from "@entities";
import { BadRequestException } from "@shared/exceptions/httpException";

export class ValidateUsuarioCreateUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) { }

  async execute(usuario: UsuarioCreate): Promise<void> {
    if (!usuario.email) {
      throw new BadRequestException("E-mail não informado.");
    }
    
    if (!usuario.senha) {
      throw new BadRequestException("Senha não informada.");
    }

    //return this.usuarioRepository.create(usuario);
    return this.usuarioRepository
      .findByEmail(usuario.email)
      .then((usuarioComEmail) => {
        if (usuarioComEmail) {
          throw new BadRequestException(`Já existe um usuário com o e-mail ${usuario.email}.`);
        }
      });
  }
}