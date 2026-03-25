import { ValidationHandler } from "../handlers/validation-handler";
import { RegistrationForm } from "../types/registration-form";

export class FormSubmissionService {
  constructor(private readonly validationHandler: ValidationHandler) {}

  submit(formData: RegistrationForm): void {
    console.log(`[FormSubmissionService] Recebendo cadastro de ${formData.name}.`);

    const validationResult = this.validationHandler.handle(formData);

    if (!validationResult.success) {
      console.log(
        `[FormSubmissionService] Formulario rejeitado: ${validationResult.message}`,
      );
      return;
    }

    console.log("[FormSubmissionService] Formulario validado e enviado com sucesso.");
  }
}
