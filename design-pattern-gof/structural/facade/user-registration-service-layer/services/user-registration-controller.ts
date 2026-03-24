import { UserRegistrationFacade } from "../facades/user-registration-facade";
import { UserRegistrationRequest } from "../types/user-registration-request";

export class UserRegistrationController {
  constructor(private readonly registrationFacade: UserRegistrationFacade) {}

  create(request: UserRegistrationRequest): void {
    const registeredUser = this.registrationFacade.register(request);
    console.log("Resposta da API:", registeredUser);
  }
}
