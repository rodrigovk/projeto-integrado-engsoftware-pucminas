import nodemailer from "nodemailer";
import { EmailOptions, IEmailService } from "@use-cases/mail-services/send-email.use-case";

export class NodemailerEmailService implements IEmailService {
  async send (options: EmailOptions): Promise<void> {
    let transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: {
        user: options.username,
        pass: options.password,
      },
    });

    await transporter.sendMail({ //let info = 
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    // console.log("Message sent: %s", info.messageId);
  }
}