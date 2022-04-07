import UserData from "../user-data";

interface UserRepository {
  findAllUsers(): Promise<UserData[]>;
  findUserByEmail(email: string): Promise<UserData>;
  add(user: UserData): Promise<void>;
  exists(user: UserData): Promise<boolean>;
}

export default UserRepository;
