import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";

export interface ValidationHandler {
  setNext(handler: ValidationHandler): ValidationHandler;
  handle(formData: RegistrationForm): ValidationResult;
}
