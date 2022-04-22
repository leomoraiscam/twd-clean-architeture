import { User, UserData } from '@/entities';
import { Either, right } from '@/shared';
import { MailServiceError } from '@/usecases/errors';
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email';
import { UserRepository } from '@/usecases/register-user-on-mailinglist/ports';
import { RegisterUserOnMainList } from '@/usecases/register-user-on-mailinglist/register-user-on-mainlist';
import InMemoryUserRepository from '@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository';
import { SendEmail } from '@/usecases/send-email';
import { EmailOptions, EmailService } from '@/usecases/send-email/ports';

describe('Register and send email to user use case', () => {
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

  class MailServiceMock implements EmailService {
    public timesSendWasCalled = 0;

    async send(
      emailOptions: EmailOptions
    ): Promise<Either<MailServiceError, EmailOptions>> {
      this.timesSendWasCalled += 1;

      return right(emailOptions);
    }
  }

  it('Should be able add user with complete data to main list', async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const registerUseCase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const mailServiceMock = new MailServiceMock();

    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock);

    const registerAndSendEmailUseCase: RegisterAndSendEmail =
      new RegisterAndSendEmail(registerUseCase, sendEmailUseCase);

    const response: UserData = (
      await registerAndSendEmailUseCase.perform({
        name: 'Bernice Williams',
        email: 'co@catpe.zm',
      })
    ).value as UserData;

    const user = await userRepository.findUserByEmail('co@catpe.zm');

    expect((await user).name).toBe('Bernice Williams');
    expect(response.name).toBe('Bernice Williams');
    expect(mailServiceMock.timesSendWasCalled).toEqual(1);
    expect(response.name).toEqual('Bernice Williams');
  });
});
