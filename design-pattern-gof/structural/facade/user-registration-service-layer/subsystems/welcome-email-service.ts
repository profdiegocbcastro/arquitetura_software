export class WelcomeEmailService {
  send(email: string, name: string): void {
    console.log(`[WelcomeEmail] E-mail de boas-vindas enviado para ${name} em ${email}.`);
  }
}
