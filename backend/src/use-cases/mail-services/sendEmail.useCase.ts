export interface EmailOptions {
  readonly host: string
  readonly port: number
  readonly secure: boolean
  readonly username: string
  readonly password: string
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html: string
}

export interface IEmailService {
  send: (options: EmailOptions) => Promise<void>
}

export class SendEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) {}

  async execute(options: EmailOptions) : Promise<void> {
    return this.emailService.send(options);
  }
}