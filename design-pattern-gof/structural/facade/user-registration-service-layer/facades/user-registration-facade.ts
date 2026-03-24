import { AuditService } from "../subsystems/audit-service";
import { PasswordHasher } from "../subsystems/password-hasher";
import { UserDuplicationChecker } from "../subsystems/user-duplication-checker";
import { UserRepository } from "../subsystems/user-repository";
import { UserValidator } from "../subsystems/user-validator";
import { WelcomeEmailService } from "../subsystems/welcome-email-service";
import { RegisteredUser } from "../types/registered-user";
import { UserRegistrationRequest } from "../types/user-registration-request";

export class UserRegistrationFacade {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly duplicationChecker: UserDuplicationChecker,
    private readonly passwordHasher: PasswordHasher,
    private readonly userRepository: UserRepository,
    private readonly welcomeEmailService: WelcomeEmailService,
    private readonly auditService: AuditService,
  ) {}

  register(request: UserRegistrationRequest): RegisteredUser {
    this.userValidator.validate(request);
    this.duplicationChecker.ensureEmailIsAvailable(request.email);

    const passwordHash = this.passwordHasher.hash(request.password);
    const registeredUser = this.userRepository.save({
      id: `USR-${request.email.split("@")[0].toUpperCase()}`,
      name: request.name,
      email: request.email,
      passwordHash,
    });

    this.welcomeEmailService.send(registeredUser.email, registeredUser.name);
    this.auditService.register(`Usuário ${registeredUser.email} cadastrado.`);

    return registeredUser;
  }
}
