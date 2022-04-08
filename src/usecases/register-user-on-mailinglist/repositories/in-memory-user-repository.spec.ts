import UserData from "../user-data";
import InMemoryUserRepository from "./in-memory-user-repository";

describe("In memory user repository", () => {
  it("should return null if user in not found", async () => {
    const users: UserData[] = [];

    const userRepository = new InMemoryUserRepository(users);

    const user = await userRepository.findUserByEmail("vakjev@jal.gq");

    expect(user).toBeNull();
  });

  it("should return user if it is found in the repository", async () => {
    const users: UserData[] = [];

    const name = "Norman Stewart";
    const email = "cirebibi@idehatga.cd";

    const userRepository = new InMemoryUserRepository(users);

    await userRepository.add({
      name,
      email,
    });

    const user = await userRepository.findUserByEmail("cirebibi@idehatga.cd");

    expect(user.name).toBe("Norman Stewart");
  });

  it("should return all users in the repository", async () => {
    const users: UserData[] = [
      {
        name: "Tommy Floyd",
        email: "rilezaba@gurulnug.dj",
      },
      {
        name: "Jordan Lawrence",
        email: "naf@octavap.bv",
      },
    ];

    const userRepository = new InMemoryUserRepository(users);

    const returnedUsers = await userRepository.findAllUsers();

    expect((await returnedUsers).length).toBe(2);
  });
});
