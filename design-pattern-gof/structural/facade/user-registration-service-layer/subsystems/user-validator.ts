import { UserRegistrationRequest } from "../types/user-registration-request";

export class UserValidator {
  validate(request: UserRegistrationRequest): void {
    if (!request.name || !request.email || !request.password) {
      throw new Error("Dados obrigatórios não informados.");
    }

    console.log("[Validator] Dados do usuário validados.");
  }
}
