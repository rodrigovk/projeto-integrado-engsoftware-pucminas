import { Request, Response } from "express";
// import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/find-usuario.use-case";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente/find-cliente-id-usuario.use-case";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador/find-administrador-id-usuario.use-case";
import { FindCountTicketAguardandoRespostaUseCase, FindCountTicketRespondidoUseCase } from "@use-cases/ticket";
import { BadRequestException } from "@shared/exceptions/http-exception";

export class GetDashInfoController {
  constructor(
    // private findUsuarioByIdUsuarioUseCase: FindUsuarioByIdUsuarioUseCase,
    private findAdministradorByIdUsuarioUseCase: FindAdministradorByIdUsuarioUseCase,
    private findClienteByIdUsuarioUseCase: FindClienteByIdUsuarioUseCase,
    private findCountTicketAguardandoRespostaUseCase: FindCountTicketAguardandoRespostaUseCase,
    private findCountTicketRespondidoUseCase: FindCountTicketRespondidoUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const idUsuario: number = Number(request.params.id);

    if (isNaN(idUsuario)) { //?
      throw new BadRequestException("ID inválida.");
    }

    // const usuario = await this.findUsuarioByIdUsuarioUseCase.execute(idUsuario);
    // if (!usuario) {
    //   throw new BadRequestException("Usuário não encontrado.");
    // }

    const administrador = await this.findAdministradorByIdUsuarioUseCase.execute(idUsuario);
    let cliente;
    if (!administrador) {
      cliente = await this.findClienteByIdUsuarioUseCase.execute(idUsuario);
    }

    let dashInfo;
    if (administrador) {
      const countTicketAguardandoResposta = await this.findCountTicketAguardandoRespostaUseCase.execute();

      dashInfo = {
        assinaturas: {
          quantidade: 0
        },
        contas: {
          quantidade: 0,
          valor: 0,
        },
        tickets: {
          quantidade: countTicketAguardandoResposta,
        }
      }
    } else {
      const countTicketRespondido = await this.findCountTicketRespondidoUseCase.execute(cliente.idCliente);

      dashInfo = {
        tickets: {
          quantidade: countTicketRespondido,
        }
      }
    }

    return response.status(200).json(dashInfo);
  }
}