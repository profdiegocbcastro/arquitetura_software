import { ClassificacaoLinha } from "../value-objects/classificacaoLinha.js";

/**
 * =========================================================
 * Serviço de Domínio: Classificação
 * =========================================================
 */
export class ClassificacaoService {
  calcular(times, partidas) {
    const linhasPorTime = new Map();

    for (const time of times) {
      linhasPorTime.set(time.id, {
        time,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        golsPro: 0,
        golsContra: 0,
      });
    }

    for (const partida of partidas.filter((item) => item.estaEncerrada())) {
      const mandante = linhasPorTime.get(partida.mandanteId);
      const visitante = linhasPorTime.get(partida.visitanteId);
      const vencedorId = partida.placar.vencedorId(partida.mandanteId, partida.visitanteId);

      aplicarPlacar(mandante, partida.placar.golsMandante, partida.placar.golsVisitante);
      aplicarPlacar(visitante, partida.placar.golsVisitante, partida.placar.golsMandante);

      if (vencedorId === null) {
        mandante.empates += 1;
        visitante.empates += 1;
      } else if (vencedorId === partida.mandanteId) {
        mandante.vitorias += 1;
        visitante.derrotas += 1;
      } else {
        visitante.vitorias += 1;
        mandante.derrotas += 1;
      }
    }

    return Array.from(linhasPorTime.values())
      .map((linha) => new ClassificacaoLinha({ posicao: 0, ...linha }))
      .sort(compareClassificacao)
      .map((linha, index) => linha.marcarPosicao(index + 1));
  }
}

function aplicarPlacar(linha, golsPro, golsContra) {
  linha.jogos += 1;
  linha.golsPro += golsPro;
  linha.golsContra += golsContra;
}

function compareClassificacao(a, b) {
  return (
    b.pontos - a.pontos ||
    b.vitorias - a.vitorias ||
    b.saldoGols - a.saldoGols ||
    b.golsPro - a.golsPro ||
    a.derrotas - b.derrotas ||
    a.time.nome.localeCompare(b.time.nome)
  );
}
