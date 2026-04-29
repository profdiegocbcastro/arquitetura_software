/**
 * Error used for domain rule violations.
 */
export class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = "DomainError";
  }
}
