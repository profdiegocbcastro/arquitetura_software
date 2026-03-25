import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";
import { BaseValidationHandler } from "./base-validation-handler";

export class RequiredFieldsValidationHandler extends BaseValidationHandler {
  override handle(formData: RegistrationForm): ValidationResult {
    if (!formData.name.trim()) {
      return this.fail("O campo nome e obrigatorio.");
    }

    if (!formData.email.trim()) {
      return this.fail("O campo e-mail e obrigatorio.");
    }

    if (!formData.password.trim()) {
      return this.fail("O campo senha e obrigatorio.");
    }

    return super.handle(formData);
  }
}
