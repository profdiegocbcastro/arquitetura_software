import { RegistrationForm } from "../types/registration-form";
import { ValidationResult } from "../types/validation-result";
import { ValidationHandler } from "./validation-handler";

export abstract class BaseValidationHandler implements ValidationHandler {
  private nextHandler?: ValidationHandler;

  setNext(handler: ValidationHandler): ValidationHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(formData: RegistrationForm): ValidationResult {
    if (!this.nextHandler) {
      return {
        success: true,
        message: "Formulario validado com sucesso.",
      };
    }

    return this.nextHandler.handle(formData);
  }

  protected fail(message: string): ValidationResult {
    return {
      success: false,
      message,
    };
  }
}
