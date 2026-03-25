import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";
import { BaseValidationHandler } from "./base-validation-handler";

export class PasswordStrengthValidationHandler extends BaseValidationHandler {
  override handle(formData: RegistrationForm): ValidationResult {
    const hasMinimumLength = formData.password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);

    if (!hasMinimumLength || !hasLetter || !hasNumber) {
      return this.fail(
        "A senha deve ter ao menos 8 caracteres, letras e numeros.",
      );
    }

    return super.handle(formData);
  }
}
