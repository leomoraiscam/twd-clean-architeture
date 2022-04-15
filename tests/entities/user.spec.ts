import { User } from "../../src/entities";

describe("User domain class", () => {
  it("should not create user with invalid email address", () => {
    const invalidEmail = "invalid_email";

    const error = User.create({
      name: "any_name",
      email: invalidEmail,
    }).value as Error;

    expect(error.name).toEqual("InvalidEmailError");
    expect(error.message).toEqual(`Invalid email:${invalidEmail}.`);
  });

  it("should not create user with invalid name (too few characters)", () => {
    const invalidName = "L      ";

    const error = User.create({
      name: invalidName,
      email: "email@email.com",
    }).value as Error;

    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name:${invalidName}.`);
  });

  it("should not create user with invalid name (too few characters)", () => {
    const invalidName = "L      ".repeat(257);

    const error = User.create({
      name: invalidName,
      email: "email@email.com",
    }).value as Error;

    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name:${invalidName}.`);
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
