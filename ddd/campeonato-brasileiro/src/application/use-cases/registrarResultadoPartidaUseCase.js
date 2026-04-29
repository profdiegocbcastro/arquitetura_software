/**
 * =========================================================
 * Caso de uso: Registrar Resultado
 * =========================================================
 */
export class RegistrarResultadoPartidaUseCase {
  constructor(campeonatoRepository) {
    this.campeonatoRepository = campeonatoRepository;
  }

  execute({ campeonatoId, partidaId, golsMandante, golsVisitante }) {
    const campeonato = this.campeonatoRepository.findById(campeonatoId);

    if (!campeonato) {
      throw new Error(`Campeonato ${campeonatoId} não encontrado.`);
    }

    campeonato.registrarResultado({
      partidaId,
      golsMandante,
      golsVisitante,
    });

    this.campeonatoRepository.save(campeonato);
    return campeonato.buscarPartida(partidaId);
  }
}
