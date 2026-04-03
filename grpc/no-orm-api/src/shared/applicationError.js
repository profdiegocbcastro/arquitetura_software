/**
 * Erro base da aplicação.
 *
 * A partir desta classe criamos erros de dominio
 * que não conhecem nada de gRPC.
 */
export class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApplicationError";
  }
}

/**
 * Erro usado para dados de entrada inválidos.
 */
export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Erro usado quando o recurso consultado não existe.
 */
export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
