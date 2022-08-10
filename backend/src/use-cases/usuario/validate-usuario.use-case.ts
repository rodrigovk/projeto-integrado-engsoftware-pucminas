import { IUsuarioRepository } from "@repositories/usuario.repository";
import { Usuario } from "@entities";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class ValidateUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(usuario: Usuario) : Promise<void> {
    // if (!usuario.idUsuario) {
    //   throw new BadRequestException('ID não informada.'); 
    // }

    if (!usuario.email) {
      throw new BadRequestException('E-mail não informado.');
    }

    if (!usuario.senha) {
      throw new BadRequestException('Senha não informada.');
    }

    //return this.usuarioRepository.create(usuario);
    return this.usuarioRepository
      .findByEmail(usuario.email)
      .then((usuarioComEmail) => {
        if (usuarioComEmail) {
          throw new BadRequestException(`Já existe um usuário com o e-mail ${usuario.email}.`);
        }
        //return userRepository.findByProperty({ email });
      });
      // .then((userWithEmail) => {
      //   if (userWithEmail.length) {
      //     throw new Error(`User with email: ${email} already exists`);
      //   }
      //   return userRepository.add(newUser);
      // });
  }
}