import { MongodbUserRepository } from '@/external/repositories/mongodb';
import { MongoHelper } from '@/external/repositories/mongodb/helper';

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection('users');
  });

  it('When user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository();

    const user = { name: 'Scott Rios', email: 'obwowuh@pe.nc' };

    await userRepository.add(user);

    expect(await userRepository.exists(user)).toBeTruthy();
  });

  it('Find all users should return all added users', async () => {
    const userRepository = new MongodbUserRepository();

    await userRepository.add({
      name: 'Scott Rios',
      email: 'obwowuh@pe.nc',
    });

    await userRepository.add({
      name: 'Barry Ford',
      email: 'nowub@adwo.sm',
    });

    const users = await userRepository.findAllUsers();

    expect(users[0].name).toEqual('Scott Rios');
  });
});
