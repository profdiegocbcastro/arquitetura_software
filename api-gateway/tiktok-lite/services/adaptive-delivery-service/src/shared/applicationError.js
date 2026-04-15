/**
 * Erro base da aplicação.
 */
export class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApplicationError";
  }
}

/**
 * Erro para dados de entrada inválidos.
 */
export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
