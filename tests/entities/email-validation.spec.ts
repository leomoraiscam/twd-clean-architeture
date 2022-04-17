import { Email } from "@/entities";

describe("Email validation", () => {
  it("Should be able not accept null strings", () => {
    const email = null;

    expect(Email.validate(email)).toBeFalsy();
  });

  test("Should be able accept valid email", () => {
    const email = "any@mail.com";

    expect(Email.validate(email)).toBeTruthy();
  });

  it("Should be able accept valid email", () => {
    const email = "any@email.com";

    expect(Email.validate(email)).toBeTruthy();
  });

  it("Should not be able accept local part larger than 320 parts", () => {
    const email = `${"l".repeat(64)}@${"d".repeat(128)}.${"d".repeat(128)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept domain part larger than 255 parts", () => {
    const email = `local@${"d".repeat(128)}.${"d".repeat(128)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept local part larger than 64 parts", () => {
    const email = `${"l".repeat(65)}@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept empty local part", () => {
    const email = `@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept empty domain part", () => {
    const email = `any@`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept domain with a part larger than 63 chars", () => {
    const email = `any@${"d".repeat(64)}.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept local part with a invalid char", () => {
    const email = `any email@email.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept local part with two dots", () => {
    const email = `any..email@email.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept local part with ending dot", () => {
    const email = `any.@email.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("Should not be able accept email without an at-sign", () => {
    const email = `anyemail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });
});
