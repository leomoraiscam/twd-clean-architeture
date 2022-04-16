import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { User, UserData } from "@/entities";
import { Either, left, right } from "@/shared";
import { UseCase } from "@/usecases/ports";
import { UserRepository } from "./ports";

// eslint-disable-next-line import/prefer-default-export
export class RegisterUserOnMainList implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async perform(
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
