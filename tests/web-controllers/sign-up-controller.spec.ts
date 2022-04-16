import { UserData } from "@/entities";
import RegisterUserOnMainList from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import InMemoryUserRepository from "@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { RegisterUserController } from "@/web-controllers/register-user-controller";

describe("Sign Up web controller", () => {
  it("should return status code 201 when request contains valid user data", async () => {
    const request: HttpRequest = {
      body: {
        name: "Larry Gonzales",
        email: "avtu@kodo.vn",
      },
    };

    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    );
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(request.body);
  });

  it.skip("should return status code 201 when request contains valid user data", async () => {
    const request: HttpRequest = {
      body: {
        name: "Larry Gonzales",
        email: "avtu@kodo.vn",
      },
    };

    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    );
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(request.body);
  });
});
