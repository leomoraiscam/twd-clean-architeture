import UserData from "../user-data";
import InMemoryUserRepository from "./in-memory-user-repository";

describe("In memory user repository", () => {
  it("should return null if user in not found", async () => {
    const users: UserData[] = [];

    const userRepository = new InMemoryUserRepository(users);

    const user = await userRepository.findUserByEmail("vakjev@jal.gq");

    expect(user).toBeNull();
  });
});
