import { MongodbUserRepository } from '@/external/repositories/mongodb';
import { RegisterUserOnMainList } from '@/usecases/register-user-on-mailinglist';
import { RegisterUserController } from '@/web-controllers';

export const makeRegisterUserController = (): RegisterUserController => {
  const mongoDbUserRepository = new MongodbUserRepository();
  const registerUserOnMainList = new RegisterUserOnMainList(
    mongoDbUserRepository
  );
  const registerUserController: RegisterUserController =
    new RegisterUserController(registerUserOnMainList);

  return registerUserController;
};
