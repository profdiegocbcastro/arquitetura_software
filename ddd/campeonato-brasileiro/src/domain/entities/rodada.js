import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entidade: Rodada
 * =========================================================
 *
 * Garante que um time não jogue duas vezes na mesma rodada.
 */
export class Rodada {
  constructor(numero) {
    if (!Number.isInteger(numero) || numero <= 0) {
      throw new DomainError("O número da rodada deve ser um inteiro positivo.");
    }

    this.numero = numero;
    this.partidas = [];
  }

  adicionarPartida(partida) {
    const timeJaJogaNaRodada = this.partidas.some(
      (partidaExistente) =>
        partidaExistente.envolveTime(partida.mandanteId) ||
        partidaExistente.envolveTime(partida.visitanteId)
    );

    if (timeJaJogaNaRodada) {
      throw new DomainError(
        `A rodada ${this.numero} já possui uma partida com um dos times informados.`
      );
    }

    this.partidas.push(partida);
  }
}
