import { UserData } from "@/entities";
import { UserRepository } from "@/usecases/register-user-on-mailinglist/ports";
import { RegisterUserOnMainList } from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import InMemoryUserRepository from "@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository";

describe("Register user on main list use case", () => {
  it("Should be able add user with complete data to main list", async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const name = "Rachel Klein";
    const email = "lutefde@kipijaw.fj";

    const response = await usecase.perform({ name, email });

    const user = await userRepository.findUserByEmail("lutefde@kipijaw.fj");

    expect((await user).name).toBe("Rachel Klein");
    expect(response.value.name).toBe("Rachel Klein");
  });

  it("Should not be able add user with invalid email to mailing list", async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const name = "Rachel Klein";
    const invalidEmail = "invalid_email";

    const response = (
      await usecase.perform({
        name,
        email: invalidEmail,
      })
    ).value as Error;

    const user = await userRepository.findUserByEmail("lutefde@kipijaw.fj");

    expect(user).toBeNull();
    expect(response.name).toEqual("InvalidEmailError");
  });

  it("Should not be able add user with invalid name to mailing list", async () => {
    const users: UserData[] = [];

    const userRepository: UserRepository = new InMemoryUserRepository(users);

    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );

    const invalidName = "";
    const email = "vodevo@kuejo.gw";

    const response = (
      await usecase.perform({
        name: invalidName,
        email,
      })
    ).value as Error;

    const user = await userRepository.findUserByEmail("vodevo@kuejo.gw");

    expect(user).toBeNull();
    expect(response.name).toEqual("InvalidNameError");
  });
});
