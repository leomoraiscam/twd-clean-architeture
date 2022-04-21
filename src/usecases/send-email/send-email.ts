import { UserData } from '@/entities';
import { Either } from '@/shared';
import { UseCase } from '@/usecases/ports';

import { MailServiceError } from '../errors';
import { EmailOptions, EmailService } from './ports';

export class SendEmail implements UseCase {
  private readonly emailOptions: EmailOptions;

  private readonly emailService: EmailService;

  constructor(emailOptions: EmailOptions, emailService: EmailService) {
    this.emailOptions = emailOptions;
    this.emailService = emailService;
  }

  async perform(
    userData: UserData
  ): Promise<Either<MailServiceError, EmailOptions>> {
    const greetins = `E ai <b>${userData.name}</b>, beleza ?`;
    const customizedHTML = `${greetins}<br><br>${this.emailOptions.html}`;

    const emailInfo: EmailOptions = {
      host: this.emailOptions.host,
      port: this.emailOptions.port,
      username: this.emailOptions.username,
      password: this.emailOptions.password,
      from: this.emailOptions.from,
      to: `${userData.name}<${userData.email}>`,
      subject: this.emailOptions.subject,
      text: this.emailOptions.text,
      html: customizedHTML,
      attachments: this.emailOptions.attachments,
    };

    return this.emailService.send(emailInfo);
  }
}
