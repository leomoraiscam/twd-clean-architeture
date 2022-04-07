import UserRepository from "../ports/user-repository";
import UserData from "../user-data";

class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  add(user: UserData): Promise<void> {
    throw new Error("err");
  }

  findUserByEmail(email: string): Promise<UserData> {
    return null;
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error("err");
  }

  exists(user: UserData): Promise<boolean> {
    throw new Error("err");
  }
}

export default InMemoryUserRepository;
