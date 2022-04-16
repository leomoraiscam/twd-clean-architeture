import { UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { RegisterUserOnMainList } from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import InMemoryUserRepository from "@/usecases/register-user-on-mailinglist/repositories/in-memory-user-repository";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { RegisterUserController } from "@/web-controllers/register-user-controller";
import { MissingParamError } from "@/web-controllers/errors";
import { UseCase } from "@/usecases/ports";

describe("Sign Up web controller", () => {
  const users: UserData[] = [];
  const userRepository = new InMemoryUserRepository(users);
  const usecase: UseCase = new RegisterUserOnMainList(userRepository);
  const controller: RegisterUserController = new RegisterUserController(
    usecase
  );

  class ErrorThowingUseCaseStub implements UseCase {
    perform(request: any): Promise<void> {
      throw Error();
    }
  }

  const errorThowingUseCaseStub: UseCase = new ErrorThowingUseCaseStub();

  it("should return status code 201 when request contains valid user data", async () => {
    const request: HttpRequest = {
      body: {
        name: "Larry Gonzales",
        email: "avtu@kodo.vn",
      },
    };

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

    const response: HttpResponse = await controller.handle(requestWithoutEmail);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
  });

  it("should return status code 400 when request is missing user email and name", async () => {
    const requestWithoutData: HttpRequest = {
      body: {},
    };

    const response: HttpResponse = await controller.handle(requestWithoutData);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
  });

  it("should return status code 500 when server raises", async () => {
    const request: HttpRequest = {
      body: {
        name: "Larry Gonzales",
        email: "avtu@kodo.vn",
      },
    };

    const controllerWithStub: RegisterUserController =
      new RegisterUserController(errorThowingUseCaseStub);
    const response: HttpResponse = await controllerWithStub.handle(request);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Error);
  });
});
