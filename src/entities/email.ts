class Email {
  static validate(email: string) {
    if (!email) {
      return false;
    }

    if (email.length > 320) {
      return false;
    }

    const [local, _] = email.split("@");

    if (local.length > 64) {
      return false;
    }

    return true;
  }
}

export default Email;
