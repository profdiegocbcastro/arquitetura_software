import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";
import { BaseValidationHandler } from "./base-validation-handler";

export class EmailFormatValidationHandler extends BaseValidationHandler {
  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  override handle(formData: RegistrationForm): ValidationResult {
    if (!this.emailPattern.test(formData.email)) {
      return this.fail("O e-mail informado nao possui um formato valido.");
    }

    return super.handle(formData);
  }
}
