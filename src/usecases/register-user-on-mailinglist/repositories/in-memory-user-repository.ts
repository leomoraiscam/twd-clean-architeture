import UserRepository from "../ports/user-repository";
import UserData from "../user-data";

class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);

    if (!exists) {
      this.repository.push(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    const userFilter = this.repository.filter((user) => {
      return user.email === email;
    });

    if (userFilter.length > 0) {
      return userFilter[0];
    }

    return null;
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error("err");
  }

  async exists(user: UserData): Promise<boolean> {
    if ((await this.findUserByEmail(user.email)) === null) {
      return false;
    }

    return true;
  }
}

export default InMemoryUserRepository;
