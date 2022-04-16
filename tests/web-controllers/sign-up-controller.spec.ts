import { UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import RegisterUserOnMainList from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import InMemoryUserRepository from "@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { RegisterUserController } from "@/web-controllers/register-user-controller";
import { MissingParamError } from "@/web-controllers/errors";

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

  it("should return status code 400 when request contains invalid name", async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: "L",
        email: "baavo@duzas.re",
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName
    );

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });

  it("should return status code 400 when request contains invalid email", async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: "Eula Peters",
        email: "giagadocvikto.br",
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    );

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });

  it("should return status code 400 when request is missing user name", async () => {
    const requestWithoutName: HttpRequest = {
      body: {
        email: "Maurice Page",
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
    const response: HttpResponse = await controller.handle(requestWithoutName);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
  });

  it("should return status code 400 when request is missing user email", async () => {
    const requestWithoutEmail: HttpRequest = {
      body: {
        name: "Eula Peters",
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
    const response: HttpResponse = await controller.handle(requestWithoutEmail);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
  });

  it("should return status code 400 when request is missing user email and name", async () => {
    const requestWithoutData: HttpRequest = {
      body: {},
    };

    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMainList = new RegisterUserOnMainList(
      userRepository
    );
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    );
    const response: HttpResponse = await controller.handle(requestWithoutData);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
  });
});
