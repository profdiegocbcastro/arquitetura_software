import { Campeonato } from "../../domain/entities/campeonato.js";
import { Jogador } from "../../domain/entities/jogador.js";
import { Time } from "../../domain/entities/time.js";
import { TabelaService } from "../../domain/services/tabelaService.js";

/**
 * =========================================================
 * Caso de uso: Montar Campeonato Brasileiro
 * =========================================================
 *
 * Orquestra o domínio para criar times, jogadores, tabela e rodadas.
 */
export class MontarCampeonatoBrasileiroUseCase {
  constructor(campeonatoRepository) {
    this.campeonatoRepository = campeonatoRepository;
    this.tabelaService = new TabelaService();
  }

  execute() {
    const campeonato = new Campeonato({
      id: "brasileirao-2026-serie-a",
      nome: "Campeonato Brasileiro",
      temporada: 2026,
      serie: "A",
      quantidadeRebaixados: 4,
    });

    const times = criarTimesSerieA();

    for (const time of times) {
      campeonato.inscreverTime(time);
    }

    const rodadas = this.tabelaService.criarTurnoUnico(times);

    for (const rodada of rodadas) {
      campeonato.adicionarRodada(rodada);
    }

    this.campeonatoRepository.save(campeonato);
    return campeonato;
  }
}

function criarTimesSerieA() {
  const dados = [
    ["fla", "Flamengo", "Rio de Janeiro"],
    ["pal", "Palmeiras", "São Paulo"],
    ["bot", "Botafogo", "Rio de Janeiro"],
    ["flu", "Fluminense", "Rio de Janeiro"],
    ["vas", "Vasco", "Rio de Janeiro"],
    ["cor", "Corinthians", "São Paulo"],
    ["sao", "São Paulo", "São Paulo"],
    ["san", "Santos", "Santos"],
    ["gre", "Grêmio", "Porto Alegre"],
    ["int", "Internacional", "Porto Alegre"],
    ["cru", "Cruzeiro", "Belo Horizonte"],
    ["cam", "Atlético Mineiro", "Belo Horizonte"],
    ["bah", "Bahia", "Salvador"],
    ["vit", "Vitória", "Salvador"],
    ["for", "Fortaleza", "Fortaleza"],
    ["cea", "Ceará", "Fortaleza"],
    ["cap", "Athletico Paranaense", "Curitiba"],
    ["cfc", "Coritiba", "Curitiba"],
    ["spo", "Sport", "Recife"],
    ["goi", "Goiás", "Goiânia"],
  ];

  return dados.map(([id, nome, cidade], index) => {
    const time = new Time({ id, nome, cidade, serie: "A" });

    time.adicionarJogador(
      new Jogador({
        id: `${id}-goleiro`,
        nome: `Goleiro ${nome}`,
        posicao: "Goleiro",
        numero: 1,
      })
    );

    time.adicionarJogador(
      new Jogador({
        id: `${id}-atacante`,
        nome: `Atacante ${nome}`,
        posicao: "Atacante",
        numero: 9 + (index % 2),
      })
    );

    return time;
  });
}
