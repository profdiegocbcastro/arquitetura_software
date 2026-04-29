import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Value Object: Placar
 * =========================================================
 *
 * Representa um valor do domínio, como 2x1.
 */
export class Placar {
  constructor(golsMandante, golsVisitante) {
    this.golsMandante = readGoals(golsMandante, "golsMandante");
    this.golsVisitante = readGoals(golsVisitante, "golsVisitante");
  }

  houveEmpate() {
    return this.golsMandante === this.golsVisitante;
  }

  vencedorId(mandanteId, visitanteId) {
    if (this.houveEmpate()) {
      return null;
    }

    return this.golsMandante > this.golsVisitante ? mandanteId : visitanteId;
  }

  golsDoTime(timeId, mandanteId, visitanteId) {
    if (timeId === mandanteId) {
      return this.golsMandante;
    }

    if (timeId === visitanteId) {
      return this.golsVisitante;
    }

    throw new DomainError(`Time ${timeId} não participa desta partida.`);
  }

  golsContraTime(timeId, mandanteId, visitanteId) {
    if (timeId === mandanteId) {
      return this.golsVisitante;
    }

    if (timeId === visitanteId) {
      return this.golsMandante;
    }

    throw new DomainError(`Time ${timeId} não participa desta partida.`);
  }

  toString() {
    return `${this.golsMandante}x${this.golsVisitante}`;
  }
}

function readGoals(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new DomainError(`${fieldName} deve ser um inteiro maior ou igual a zero.`);
  }

  return numericValue;
}
