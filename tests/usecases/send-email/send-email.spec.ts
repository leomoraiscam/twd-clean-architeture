import { Either, Right, right } from '@/shared';
import { MailServiceError } from '@/usecases/errors/mail-service-error';
import { EmailOptions, EmailService } from '@/usecases/send-email/ports';
import { SendEmail } from '@/usecases/send-email/send-email';

const attachmentFilePath = '../resources/text.txt';
const fromName = 'Test';
const fromEmail = 'from_mail@mail.com';
const toName = 'anyName';
const toEmail = 'any_email@mail.com';
const subject = 'Test e-mail';
const emailBody = 'Hello world attachment test';
const emailBodyHTML = '<b>Hello world attachment test</b>';
const attachment = [
  {
    filename: attachmentFilePath,
    contentType: 'text/plain',
  },
];

const mailOptions: EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: 'test',
  from: `${fromName} ${fromEmail}`,
  to: `${toName}<${toEmail}>`,
  subject,
  text: emailBody,
  html: emailBodyHTML,
  attachments: attachment,
};

class MailServiceStub implements EmailService {
  async send(
    emailOptions: EmailOptions
  ): Promise<Either<MailServiceError, EmailOptions>> {
    return right(emailOptions);
  }
}

describe('Send email to user', () => {
  it('Should email user with valid name and email address', async () => {
    const mailServiceStub = new MailServiceStub();

    const usecase = new SendEmail(mailOptions, mailServiceStub);

    const response = await usecase.perform({
      name: toName,
      email: toEmail,
    });

    expect(response).toBeInstanceOf(Right);
  });
});
