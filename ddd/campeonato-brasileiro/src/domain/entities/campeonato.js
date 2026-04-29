import { DomainError } from "../errors/domainError.js";
import { ClassificacaoService } from "../services/classificacaoService.js";

/**
 * =========================================================
 * Agregado: Campeonato
 * =========================================================
 *
 * Controla times, rodadas, tabela, classificação e rebaixamento.
 */
export class Campeonato {
  constructor({ id, nome, temporada, serie, quantidadeRebaixados = 4 }) {
    this.id = readRequiredText(id, "id");
    this.nome = readRequiredText(nome, "nome");
    this.temporada = temporada;
    this.serie = readRequiredText(serie, "serie").toUpperCase();
    this.quantidadeRebaixados = quantidadeRebaixados;
    this.times = new Map();
    this.rodadas = new Map();
    this.classificacaoService = new ClassificacaoService();
  }

  inscreverTime(time) {
    if (time.serie !== this.serie) {
      throw new DomainError(
        `${time.nome} pertence à Série ${time.serie}, mas o campeonato é Série ${this.serie}.`
      );
    }

    if (this.times.has(time.id)) {
      throw new DomainError(`O time ${time.nome} já está inscrito no campeonato.`);
    }

    this.times.set(time.id, time);
  }

  adicionarRodada(rodada) {
    if (this.rodadas.has(rodada.numero)) {
      throw new DomainError(`A rodada ${rodada.numero} já existe no campeonato.`);
    }

    for (const partida of rodada.partidas) {
      this.validarTimeInscrito(partida.mandanteId);
      this.validarTimeInscrito(partida.visitanteId);
    }

    this.rodadas.set(rodada.numero, rodada);
  }

  registrarResultado({ partidaId, golsMandante, golsVisitante }) {
    const partida = this.buscarPartida(partidaId);
    partida.encerrar(golsMandante, golsVisitante);
  }

  buscarPartida(partidaId) {
    for (const rodada of this.rodadas.values()) {
      const partida = rodada.partidas.find((item) => item.id === partidaId);

      if (partida) {
        return partida;
      }
    }

    throw new DomainError(`Partida ${partidaId} não encontrada.`);
  }

  listarPartidas() {
    return Array.from(this.rodadas.values()).flatMap((rodada) => rodada.partidas);
  }

  classificacao() {
    return this.classificacaoService.calcular(
      Array.from(this.times.values()),
      this.listarPartidas()
    );
  }

  zonaDeRebaixamento() {
    if (this.serie !== "A") {
      return [];
    }

    return this.classificacao().slice(-this.quantidadeRebaixados);
  }

  serieBProximaTemporada() {
    return this.zonaDeRebaixamento().map((linha) => ({
      timeId: linha.time.id,
      nome: linha.time.nome,
      origem: `Rebaixado da Série ${this.serie} ${this.temporada}`,
      proximaSerie: "B",
    }));
  }

  validarTimeInscrito(timeId) {
    if (!this.times.has(timeId)) {
      throw new DomainError(`Time ${timeId} não está inscrito no campeonato.`);
    }
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}
