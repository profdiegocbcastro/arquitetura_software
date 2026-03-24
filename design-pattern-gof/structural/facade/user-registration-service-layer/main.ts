import { UserRegistrationFacade } from "./facades/user-registration-facade";
import { AuditService } from "./subsystems/audit-service";
import { PasswordHasher } from "./subsystems/password-hasher";
import { UserDuplicationChecker } from "./subsystems/user-duplication-checker";
import { UserRepository } from "./subsystems/user-repository";
import { UserValidator } from "./subsystems/user-validator";
import { WelcomeEmailService } from "./subsystems/welcome-email-service";
import { UserRegistrationController } from "./services/user-registration-controller";

const userRegistrationController = new UserRegistrationController(
  new UserRegistrationFacade(
    new UserValidator(),
    new UserDuplicationChecker(),
    new PasswordHasher(),
    new UserRepository(),
    new WelcomeEmailService(),
    new AuditService(),
  ),
);

userRegistrationController.create({
  name: "Paula Torres",
  email: "paula.torres@empresa.com",
  password: "senha-forte-123",
});
