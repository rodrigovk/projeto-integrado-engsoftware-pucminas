import { Request, Response } from "express";
import { TicketResposta } from "@entities";
import { CreateTicketRespostaUseCase, FindTicketByIdTicketUseCase, ValidateTicketRespostaUseCase } from "@use-cases/ticket";
import validateRequestBodyJson from "@frameworks/webserver/validate-request-body-json";
import { EmailOptions, SendEmailUseCase } from "@use-cases/mail-services/send-email.use-case";
import { FindClienteByIdClienteUseCase } from "@use-cases/cliente/find-cliente.use-case";
import { FindUsuarioByIdUsuarioUseCase } from "@use-cases/usuario/find-usuario.use-case";

export class CreateTicketRespostaController {
  constructor(
    private createTicketRespostaUseCase: CreateTicketRespostaUseCase,
    private validateTicketRespostaUseCase: ValidateTicketRespostaUseCase,
    private findTicketByIdTicketUseCase: FindTicketByIdTicketUseCase,
    private findClienteByIdClienteUseCase: FindClienteByIdClienteUseCase,
    private findUsuarioByIdUsuarioUseCase: FindUsuarioByIdUsuarioUseCase,
    private sendEmailUseCase: SendEmailUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    validateRequestBodyJson(request);
    const ticketResposta: TicketResposta = request.body;

    await this.validateTicketRespostaUseCase.execute(ticketResposta);

    const ticketRespostaCriada = await this.createTicketRespostaUseCase.execute(ticketResposta);

    if (ticketRespostaCriada.idAdministrador != null) {
      const ticket = await this.findTicketByIdTicketUseCase.execute(ticketRespostaCriada.idTicket);
      const cliente = await this.findClienteByIdClienteUseCase.execute(ticket.idCliente);
      const usuario = await this.findUsuarioByIdUsuarioUseCase.execute(cliente.idUsuario);

      const mailOptions: EmailOptions = {
        host: process.env.EMAIL_HOST,
        port: Number.parseInt(process.env.EMAIL_PORT),
        secure: (process.env.EMAIL_SECURE === "true" || (process.env.EMAIL_SECURE === "1")),
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
        to: usuario.email,
        subject: 'Seu Ticket de suporte foi respondido por um de nossos administradores',
        text: `Olá, ${cliente.nome}! \n \n` +
          `Seu ticket de suporte "${ticket.assunto}" foi respondido por um de nossos administradores. \n` +
          `O ticket pode ser acessado a partir de nosso site: ${process.env.FRONT_URL} \n \n` +
          'Esperamos poder sempre prestar-lhes um serviço com qualidade, rapidez e modernidade. \n' +
          'Global Soft.',
        html: `Olá, <b>${cliente.nome}</b>! <br> <br>` +
          `Seu ticket de suporte "${ticket.assunto}" foi respondido por um de nossos administradores. <br>` +
          `O ticket pode ser acessado a partir de nosso site: <a href="${process.env.FRONT_URL}">acessar site</a>. <br> <br>` +
          'Esperamos poder sempre prestar-lhe um serviço com qualidade, rapidez e modernidade. <br>' +
          'Global Soft.',
      }

      this.sendEmailUseCase.execute(mailOptions);
    }

    return response.status(200).json(ticketRespostaCriada);
  }
}