import InMemoryUserRepository from "./repositories/in-memory-user-repository";
import UserData from "../../entities/user-data";
import RegisterUserOnMainList from "./register-user-on-mainlist";
import UserRepository from "./ports/user-repository";

describe("Register user on main list use case", () => {
  it("should add user with complete data to mainling list", async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const name = "Rachel Klein";
    const email = "lutefde@kipijaw.fj";

    const response = await usecase.registerUserOnMainlist({ name, email });

    const user = userRepository.findUserByEmail("lutefde@kipijaw.fj");

    expect((await user).name).toBe("Rachel Klein");
    expect(response.value.name).toBe("Rachel Klein");
  });

  it.skip("should not add user with invalid email", async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const name = "Rachel Klein";
    const email = "lutefde@kipijaw.fj";

    const response = await usecase.registerUserOnMainlist({ name, email });

    const user = userRepository.findUserByEmail("lutefde@kipijaw.fj");

    expect((await user).name).toBe("Rachel Klein");
    expect(response.value.name).toBe("Rachel Klein");
  });
});
