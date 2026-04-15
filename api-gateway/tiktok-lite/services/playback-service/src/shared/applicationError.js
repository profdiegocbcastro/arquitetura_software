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

/**
 * Erro para dependência externa indisponível.
 */
export class ExternalServiceError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "ExternalServiceError";
  }
}

/**
 * Erro para recurso não encontrado.
 */
export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
