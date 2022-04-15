import { UserData } from "../../../entities";

export interface UserRepository {
  findAllUsers(): Promise<UserData[]>;
  findUserByEmail(email: string): Promise<UserData>;
  add(user: UserData): Promise<void>;
  exists(user: UserData): Promise<boolean>;
}
