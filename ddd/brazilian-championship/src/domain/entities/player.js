import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entity: Player
 * =========================================================
 */
export class Player {
  constructor({ id, name, position, number }) {
    this.id = readRequiredText(id, "id");
    this.name = readRequiredText(name, "name");
    this.position = readRequiredText(position, "position");
    this.number = readPositiveInteger(number, "number");
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} is required.`);
  }

  return normalizedValue;
}

function readPositiveInteger(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new DomainError(`${fieldName} must be a positive integer.`);
  }

  return numericValue;
}
