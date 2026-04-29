/**
 * =========================================================
 * Value Object: Linha de Classificação
 * =========================================================
 */
export class ClassificacaoLinha {
  constructor({ posicao, time, jogos, vitorias, empates, derrotas, golsPro, golsContra }) {
    this.posicao = posicao;
    this.time = time;
    this.jogos = jogos;
    this.vitorias = vitorias;
    this.empates = empates;
    this.derrotas = derrotas;
    this.golsPro = golsPro;
    this.golsContra = golsContra;
    this.pontos = vitorias * 3 + empates;
    this.saldoGols = golsPro - golsContra;
  }

  marcarPosicao(posicao) {
    return new ClassificacaoLinha({
      posicao,
      time: this.time,
      jogos: this.jogos,
      vitorias: this.vitorias,
      empates: this.empates,
      derrotas: this.derrotas,
      golsPro: this.golsPro,
      golsContra: this.golsContra,
    });
  }

  toTableRow() {
    return {
      posicao: this.posicao,
      time: this.time.nome,
      pontos: this.pontos,
      jogos: this.jogos,
      vitorias: this.vitorias,
      empates: this.empates,
      derrotas: this.derrotas,
      saldoGols: this.saldoGols,
      golsPro: this.golsPro,
      golsContra: this.golsContra,
    };
  }
}
