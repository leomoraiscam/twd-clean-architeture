import { left } from "../shared/either";
import User from "./user";
import InvalidEmailError from "./errors/invalid-email-error";
import InvalidNameError from "./errors/invalid-name-error";
import Name from "./name";

describe("User domain class", () => {
  it("should not create user with invalid email address", () => {
    const invalidEmail = "invalid_email";

    const error = User.create({
      name: "any_name",
      email: invalidEmail,
    });

    expect(error).toEqual(left(new InvalidEmailError()));
  });

  it("should not create user with invalid name (too few characters)", () => {
    const invalidName = "L      ";

    const error = User.create({
      name: invalidName,
      email: "email@email.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  it("should not create user with invalid name (too few characters)", () => {
    const invalidName = "L      ".repeat(257);

    const error = User.create({
      name: invalidName,
      email: "email@email.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  it("should create user with valid data", () => {
    const name = "any_Name";
    const email = "any@email.com";

    const user: User = User.create({
      name,
      email,
    }).value as User;

    expect(user.name.value).toEqual(name);
    expect(user.email.email).toEqual(email);
  });
});
