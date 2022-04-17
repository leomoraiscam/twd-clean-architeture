import { RegisterUserOnMainList } from '@/usecases/register-user-on-mailinglist';
import InMemoryUserRepository from '@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository';
import { RegisterUserController } from '@/web-controllers';

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([]);
  const registerUserOnMainList = new RegisterUserOnMainList(
    inMemoryUserRepository
  );
  const registerUserController: RegisterUserController =
    new RegisterUserController(registerUserOnMainList);

  return registerUserController;
};
