import { EmailFormatValidationHandler } from "./handlers/email-format-validation-handler";
import { PasswordStrengthValidationHandler } from "./handlers/password-strength-validation-handler";
import { RequiredFieldsValidationHandler } from "./handlers/required-fields-validation-handler";
import { TermsAcceptanceValidationHandler } from "./handlers/terms-acceptance-validation-handler";
import { FormSubmissionService } from "./services/form-submission-service";
import { RegistrationForm } from "./types/registration-form";

const validationChain = new RequiredFieldsValidationHandler();

validationChain
  .setNext(new EmailFormatValidationHandler())
  .setNext(new PasswordStrengthValidationHandler())
  .setNext(new TermsAcceptanceValidationHandler());

const submissionService = new FormSubmissionService(validationChain);

const invalidForm: RegistrationForm = {
  name: "Ana Souza",
  email: "ana.souza@empresa",
  password: "12345",
  acceptedTerms: false,
};

const validForm: RegistrationForm = {
  name: "Carlos Lima",
  email: "carlos.lima@empresa.com",
  password: "SenhaSegura123",
  acceptedTerms: true,
};

submissionService.submit(invalidForm);
console.log("");
submissionService.submit(validForm);
