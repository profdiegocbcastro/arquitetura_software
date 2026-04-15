/**
 * =========================================================
 * Repositório de perfis de rede
 * =========================================================
 *
 * Mantém as faixas de banda e os bitrates recomendados para
 * simular a escolha da melhor variante do vídeo.
 */
export class NetworkProfileRepository {
  constructor() {
    this.presets = [
      {
        quality: "low",
        rank: 1,
        minimum_bandwidth_kbps: 0,
        recommended_bitrate_kbps: 350,
      },
      {
        quality: "medium",
        rank: 2,
        minimum_bandwidth_kbps: 700,
        recommended_bitrate_kbps: 900,
      },
      {
        quality: "high",
        rank: 3,
        minimum_bandwidth_kbps: 1600,
        recommended_bitrate_kbps: 1800,
      },
    ];
  }

  /**
   * Busca um preset pela qualidade.
   */
  findByQuality(quality) {
    return this.presets.find((preset) => preset.quality === quality) ?? null;
  }

  /**
   * Resolve o maior preset compatível com a banda informada.
   */
  resolveByBandwidth(bandwidthKbps) {
    const compatiblePresets = this.presets.filter(
      (preset) => bandwidthKbps >= preset.minimum_bandwidth_kbps
    );

    return compatiblePresets.at(-1) ?? this.presets[0];
  }
}
