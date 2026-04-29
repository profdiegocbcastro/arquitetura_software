import { Partida } from "../entities/partida.js";
import { Rodada } from "../entities/rodada.js";

/**
 * =========================================================
 * Serviço de Domínio: Tabela
 * =========================================================
 *
 * Cria uma tabela de turno único no formato todos contra todos.
 */
export class TabelaService {
  criarTurnoUnico(times) {
    const timesOrdenados = [...times].sort((a, b) => a.nome.localeCompare(b.nome));
    const totalRodadas = timesOrdenados.length - 1;
    const metade = timesOrdenados.length / 2;
    const ids = timesOrdenados.map((time) => time.id);
    const rodadas = [];

    for (let numeroRodada = 1; numeroRodada <= totalRodadas; numeroRodada += 1) {
      const rodada = new Rodada(numeroRodada);

      for (let indice = 0; indice < metade; indice += 1) {
        const mandanteId = ids[indice];
        const visitanteId = ids[ids.length - 1 - indice];
        const inverterMando = numeroRodada % 2 === 0;

        rodada.adicionarPartida(
          new Partida({
            id: `rodada-${numeroRodada}-jogo-${indice + 1}`,
            rodadaNumero: numeroRodada,
            mandanteId: inverterMando ? visitanteId : mandanteId,
            visitanteId: inverterMando ? mandanteId : visitanteId,
          })
        );
      }

      rodadas.push(rodada);
      ids.splice(1, 0, ids.pop());
    }

    return rodadas;
  }
}
