import Email from "./email";

describe("Email validation", () => {
  it("should not acept null strings", () => {
    const email = null;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept empty strings", () => {
    const email = "";

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should acept valid email", () => {
    const email = "delziwif@hizuwvov.bg";

    expect(Email.validate(email)).toBeTruthy();
  });

  it("should not accept local part larger than 320 parts", () => {
    const email = `${"l".repeat(64)}@${"d".repeat(128)}.${"d".repeat(128)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept domain part larger than 255 parts", () => {
    const email = `local@${"d".repeat(128)}.${"d".repeat(128)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept local part larger than 64 parts", () => {
    const email = `${"l".repeat(65)}@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept empty local part", () => {
    const email = `@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept empty domain part", () => {
    const email = `any@`;

    expect(Email.validate(email)).toBeFalsy();
  });

  it("should not accept domain with a part larger than 63 chars", () => {
    const email = `any@${"d".repeat(64)}.com`;

    expect(Email.validate(email)).toBeFalsy();
  });
});
