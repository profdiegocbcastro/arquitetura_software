import { MontarCampeonatoBrasileiroUseCase } from "./application/use-cases/montarCampeonatoBrasileiroUseCase.js";
import { RegistrarResultadoPartidaUseCase } from "./application/use-cases/registrarResultadoPartidaUseCase.js";
import { CampeonatoRepositoryInMemory } from "./infrastructure/repositories/campeonatoRepositoryInMemory.js";

/**
 * =========================================================
 * DDD - Campeonato Brasileiro
 * =========================================================
 *
 * Fluxo do exemplo:
 *
 * main -> Use Case -> Domínio -> Repositório em memória
 */

/**
 * ===============================
 * 1) Montando as dependências
 * ===============================
 */
const campeonatoRepository = new CampeonatoRepositoryInMemory();
const montarCampeonato = new MontarCampeonatoBrasileiroUseCase(campeonatoRepository);
const registrarResultado = new RegistrarResultadoPartidaUseCase(campeonatoRepository);

/**
 * ===============================
 * 2) Criando campeonato e tabela
 * ===============================
 */
const campeonato = montarCampeonato.execute();

/**
 * ===============================
 * 3) Simulando os resultados
 * ===============================
 */
for (const partida of campeonato.listarPartidas()) {
  const { golsMandante, golsVisitante } = gerarPlacarDeterministico(partida);

  registrarResultado.execute({
    campeonatoId: campeonato.id,
    partidaId: partida.id,
    golsMandante,
    golsVisitante,
  });
}

/**
 * ===============================
 * 4) Exibindo leitura do domínio
 * ===============================
 */
imprimirResumo(campeonato);

function gerarPlacarDeterministico(partida) {
  const baseMandante = somarCaracteres(partida.mandanteId) + partida.rodadaNumero;
  const baseVisitante = somarCaracteres(partida.visitanteId) + partida.rodadaNumero * 2;

  return {
    golsMandante: baseMandante % 5,
    golsVisitante: baseVisitante % 4,
  };
}

function somarCaracteres(value) {
  return value.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function imprimirResumo(campeonato) {
  const classificacao = campeonato.classificacao();
  const rebaixados = campeonato.zonaDeRebaixamento();
  const serieB = campeonato.serieBProximaTemporada();

  console.log("\n=== Campeonato Brasileiro - DDD ===");
  console.log(`Temporada: ${campeonato.temporada}`);
  console.log(`Série: ${campeonato.serie}`);
  console.log(`Times inscritos: ${campeonato.times.size}`);
  console.log(`Rodadas: ${campeonato.rodadas.size}`);
  console.log(`Partidas registradas: ${campeonato.listarPartidas().length}`);

  console.log("\n=== Top 6 ===");
  imprimirTabela(classificacao.slice(0, 6));

  console.log("\n=== Zona de rebaixamento ===");
  imprimirTabela(rebaixados);

  console.log("\n=== Série B da próxima temporada ===");
  for (const item of serieB) {
    console.log(`${item.nome} -> ${item.proximaSerie} (${item.origem})`);
  }
}

function imprimirTabela(linhas) {
  for (const linha of linhas) {
    const row = linha.toTableRow();

    console.log(
      `${row.posicao.toString().padStart(2, "0")} | ${row.time.padEnd(22)} | ` +
        `${row.pontos.toString().padStart(2, " ")} pts | ` +
        `${row.vitorias}V ${row.empates}E ${row.derrotas}D | ` +
        `SG ${row.saldoGols}`
    );
  }
}
