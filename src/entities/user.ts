/* eslint-disable consistent-return */
import UserData from "./user-data";
import { Either, left, right } from "../shared/either";
import InvalidEmailError from "./errors/invalid-email-error";
import Email from "./email";

class User {
  static create(userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }

    return right(new User());
  }
}

export default User;
