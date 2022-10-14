import { Request, Response } from "express";
// import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/find-usuario.use-case";
import { FindClienteByIdUsuarioUseCase } from "@use-cases/cliente";
import { FindAdministradorByIdUsuarioUseCase } from "@use-cases/administrador";
import { FindCountTicketAguardandoRespostaUseCase, FindCountTicketRespondidoByDateUseCase, FindCountTicketRespondidoUseCase } from "@use-cases/ticket";
import { FindCountAssinaturaVencimentoProximoUseCase } from "@use-cases/assinatura";
import { FindCountContaVencidaUseCase, FindAmountContaVencidaUseCase } from "@use-cases/conta";
import { BadRequestException } from "@shared/exceptions/httpException";

export class GetDashInfoController {
  constructor(
    // private findUsuarioByIdUsuarioUseCase: FindUsuarioByIdUsuarioUseCase,
    private findAdministradorByIdUsuarioUseCase: FindAdministradorByIdUsuarioUseCase,
    private findClienteByIdUsuarioUseCase: FindClienteByIdUsuarioUseCase,
    private findCountTicketAguardandoRespostaUseCase: FindCountTicketAguardandoRespostaUseCase,
    private findCountAssinaturaVencimentoProximoUseCase: FindCountAssinaturaVencimentoProximoUseCase,
    private findCountTicketRespondidoUseCase: FindCountTicketRespondidoUseCase,
    private findCountTicketRespondidoByDateUseCase: FindCountTicketRespondidoByDateUseCase,
    private findCountContaVencidaUseCase: FindCountContaVencidaUseCase,
    private findAmountContaVencidaUseCase: FindAmountContaVencidaUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const idUsuario: number = Number(request.params.id);

    if (isNaN(idUsuario)) {
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
      dashInfo = {
        assinaturas: {
          quantidade: await this.findCountAssinaturaVencimentoProximoUseCase.execute(),
        },
        contas: {
          quantidade: await this.findCountContaVencidaUseCase.execute(null),
          valor: await this.findAmountContaVencidaUseCase.execute(null),
        },
        tickets: {
          quantidade: await this.findCountTicketAguardandoRespostaUseCase.execute(),
          quantidadePorData: await this.findCountTicketRespondidoByDateUseCase.execute(),
        }
      }
    } else {
      dashInfo = {
        tickets: {
          quantidade: await this.findCountTicketRespondidoUseCase.execute(cliente.idCliente),
        },
        contas: {
          quantidade: await this.findCountContaVencidaUseCase.execute(cliente.idCliente),
          valor: await this.findAmountContaVencidaUseCase.execute(cliente.idCliente),
        },
      }
    }

    return response.status(200).json(dashInfo);
  }
}