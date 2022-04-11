import InvalidEmailError from "../../entities/errors/invalid-email-error";
import InvalidNameError from "../../entities/errors/invalid-name-error";
import User from "../../entities/user";
import UserData from "../../entities/user-data";
import { Either, left, right } from "../../shared/either";
import UserRepository from "./ports/user-repository";

class RegisterUserOnMainList {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async registerUserOnMainlist(
    request: UserData
  ): Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
    const userOrError: Either<InvalidEmailError | InvalidNameError, User> =
      User.create(request);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.add(request);
    }

    return right(request);
  }
}

export default RegisterUserOnMainList;
