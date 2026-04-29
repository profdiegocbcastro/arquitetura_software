/**
 * Erro usado para violações de regra do domínio.
 */
export class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = "DomainError";
  }
}
