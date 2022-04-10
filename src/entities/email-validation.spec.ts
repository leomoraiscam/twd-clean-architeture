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

  it("should not accept local part larger than 64 parts", () => {
    const email = `${"l".repeat(65)}@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });
});
