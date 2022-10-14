import { IAdministradorRepository } from "@repositories/administrador.repository";

export class AlterAdministradorSituacaoUseCase {
  constructor(
    private administradorRepository: IAdministradorRepository,
  ) {}

  async execute(idAdministrador: number, situacao: number) : Promise<void> {
    return await this.administradorRepository.alterSituacao(idAdministrador, situacao);
  }
}