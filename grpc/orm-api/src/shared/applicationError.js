/**
 * Erro base da aplicação.
 *
 * Esta classe representa erros de domínio,
 * sem qualquer dependencia de gRPC.
 */
export class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApplicationError";
  }
}

/**
 * Erro usado para entradas inválidas.
 */
export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Erro usado quando um recurso não existe.
 */
export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
