import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entidade: Time
 * =========================================================
 */
export class Time {
  constructor({ id, nome, cidade, serie }) {
    this.id = readRequiredText(id, "id");
    this.nome = readRequiredText(nome, "nome");
    this.cidade = readRequiredText(cidade, "cidade");
    this.serie = readRequiredText(serie, "serie").toUpperCase();
    this.jogadores = [];
  }

  adicionarJogador(jogador) {
    const camisaJaExiste = this.jogadores.some((item) => item.numero === jogador.numero);

    if (camisaJaExiste) {
      throw new DomainError(
        `O time ${this.nome} já possui um jogador com a camisa ${jogador.numero}.`
      );
    }

    this.jogadores.push(jogador);
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}
