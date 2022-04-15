import { UserData } from "./user-data";
import { Either, left, right } from "../shared";
import { InvalidEmailError, InvalidNameError } from "./errors";
import { Email, Name } from ".";

export class User {
  public readonly email: Email;

  public readonly name: Name;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(userData.name));
    }

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(userData.email));
    }

    const name: Name = nameOrError.value as Name;

    const email: Email = emailOrError.value as Email;

    return right(new User(name, email));
  }
}

export default User;
