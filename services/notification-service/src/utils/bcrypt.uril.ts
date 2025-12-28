import bcrypt from "bcrypt";

export class BcryptUtil {
  private static readonly SALT_ROUNDS = 12;

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
