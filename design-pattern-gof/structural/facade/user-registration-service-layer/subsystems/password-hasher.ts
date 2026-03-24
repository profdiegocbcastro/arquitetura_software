export class PasswordHasher {
  hash(password: string): string {
    const passwordHash = `hashed:${password}`;
    console.log("[PasswordHasher] Senha protegida com hash.");
    return passwordHash;
  }
}
