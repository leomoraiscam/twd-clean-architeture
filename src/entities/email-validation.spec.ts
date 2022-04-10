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
});
