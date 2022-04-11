/* eslint-disable consistent-return */
import UserData from "./user-data";
import { Either, left, right } from "../shared/either";
import InvalidEmailError from "./errors/invalid-email-error";
import Email from "./email";
import InvalidNameError from "./errors/invalid-name-error";
import Name from "./name";

class User {
  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError());
    }

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }

    return right(new User());
  }
}

export default User;
