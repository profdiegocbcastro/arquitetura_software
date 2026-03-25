import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";
import { BaseValidationHandler } from "./base-validation-handler";

export class TermsAcceptanceValidationHandler extends BaseValidationHandler {
  override handle(formData: RegistrationForm): ValidationResult {
    if (!formData.acceptedTerms) {
      return this.fail("Os termos de uso precisam ser aceitos.");
    }

    return super.handle(formData);
  }
}
