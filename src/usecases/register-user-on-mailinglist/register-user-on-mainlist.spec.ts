import UserData from './user-data';

describe('Register user on main list use case', () => {
  it('should add user with complete data to mainling list', async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainlist = new RegisterUserOnMainlist(userRepository);

    const name = 'Rachel Klein';
    const email = 'lutefde@kipijaw.fj';

    const response = await usecase.RegisterUserOnMainlist({ name, email });

    const user = userRepository.findUserByEmail('lutefde@kipijaw.fj');

    expect((await user).name).toBe('Rachel Klein');
  });
});
