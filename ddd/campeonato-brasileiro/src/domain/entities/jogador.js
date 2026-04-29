import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entidade: Jogador
 * =========================================================
 */
export class Jogador {
  constructor({ id, nome, posicao, numero }) {
    this.id = readRequiredText(id, "id");
    this.nome = readRequiredText(nome, "nome");
    this.posicao = readRequiredText(posicao, "posicao");
    this.numero = readPositiveInteger(numero, "numero");
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}

function readPositiveInteger(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new DomainError(`${fieldName} deve ser um inteiro positivo.`);
  }

  return numericValue;
}
