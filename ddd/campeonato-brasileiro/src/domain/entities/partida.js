import { DomainError } from "../errors/domainError.js";
import { Placar } from "../value-objects/placar.js";

/**
 * =========================================================
 * Agregado: Partida
 * =========================================================
 *
 * A partida controla placar e eventos.
 */
export class Partida {
  constructor({ id, rodadaNumero, mandanteId, visitanteId }) {
    this.id = readRequiredText(id, "id");
    this.rodadaNumero = rodadaNumero;
    this.mandanteId = readRequiredText(mandanteId, "mandanteId");
    this.visitanteId = readRequiredText(visitanteId, "visitanteId");
    this.placar = null;
    this.eventos = [];

    if (this.mandanteId === this.visitanteId) {
      throw new DomainError("Um time não pode jogar contra ele mesmo.");
    }
  }

  registrarEvento({ minuto, tipo, timeId, descricao }) {
    if (this.estaEncerrada()) {
      throw new DomainError("Não é possível registrar evento em partida encerrada.");
    }

    if (timeId !== this.mandanteId && timeId !== this.visitanteId) {
      throw new DomainError(`Time ${timeId} não participa desta partida.`);
    }

    this.eventos.push({
      minuto,
      tipo: readRequiredText(tipo, "tipo"),
      timeId,
      descricao: readRequiredText(descricao, "descricao"),
    });
  }

  encerrar(golsMandante, golsVisitante) {
    if (this.estaEncerrada()) {
      throw new DomainError(`A partida ${this.id} ja foi encerrada.`);
    }

    this.placar = new Placar(golsMandante, golsVisitante);
  }

  estaEncerrada() {
    return this.placar !== null;
  }

  envolveTime(timeId) {
    return this.mandanteId === timeId || this.visitanteId === timeId;
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}
