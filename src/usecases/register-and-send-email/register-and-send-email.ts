import { User, UserData } from '@/entities';
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
import { Either, left, right } from '@/shared';
import { MailServiceError } from '@/usecases/errors';
import { UseCase } from '@/usecases/ports';
import { RegisterUserOnMainList } from '@/usecases/register-user-on-mailinglist';
import { SendEmail } from '@/usecases/send-email';

export class RegisterAndSendEmail implements UseCase {
  private registerUserOnMailingList: RegisterUserOnMainList;

  private sendEmail: SendEmail;

  constructor(
    registerUserOnMailingList: RegisterUserOnMainList,
    sendEmail: SendEmail
  ) {
    this.registerUserOnMailingList = registerUserOnMailingList;
    this.sendEmail = sendEmail;
  }

  async perform(
    request: UserData
  ): Promise<
    Either<InvalidNameError | InvalidEmailError | MailServiceError, UserData>
  > {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;

    await this.registerUserOnMailingList.perform({
      email: user.email.email,
      name: user.name.value,
    });
    const result = await this.sendEmail.perform({
      email: user.email.email,
      name: user.name.value,
    });

    if (result.isLeft()) {
      return left(result.value);
    }

    return right({ name: user.name.value, email: user.email.email });
  }
}
