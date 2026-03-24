export class UserDuplicationChecker {
  ensureEmailIsAvailable(email: string): void {
    console.log(`[DuplicationChecker] E-mail ${email} disponível para cadastro.`);
  }
}
