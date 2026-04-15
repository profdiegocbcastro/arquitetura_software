/**
 * =========================================================
 * Serviço de Adaptive Delivery
 * =========================================================
 */
export class AdaptiveDeliveryService {
  constructor(networkProfileRepository) {
    this.networkProfileRepository = networkProfileRepository;
  }

  /**
   * Resolve a qualidade final com base no perfil informado e,
   * quando existir, na banda reportada pelo cliente.
   */
  resolveQuality({ networkProfile, bandwidthKbps }) {
    /**
     * Normaliza o perfil solicitado.
     *
     * Se nada vier informado, o fluxo padrão do exemplo é `auto`.
     */
    const requestedProfile = networkProfile ?? "auto";

    /**
     * Tenta descobrir um preset pela banda real informada.
     *
     * Quando a banda não vier preenchida, mantemos `null` para
     * indicar que a decisão não poderá usar essa referência.
     */
    const bandwidthPreset =
      bandwidthKbps > 0
        ? this.networkProfileRepository.resolveByBandwidth(bandwidthKbps)
        : null;

    /**
     * Quando o cliente usa `auto`, a API decide a qualidade sozinha.
     *
     * Se houver banda informada, usamos essa banda como base.
     * Caso contrário, o exemplo assume `medium` como perfil padrão.
     */
    if (requestedProfile === "auto") {
      const autoPreset =
        bandwidthPreset ?? this.networkProfileRepository.findByQuality("medium");

      /**
       * Retorna a decisão automática já com:
       *
       * - qualidade final
       * - bitrate sugerido
       * - motivo da escolha
       * - modo de entrega
       * - protocolo usado na simulação
       */
      return {
        selected_quality: autoPreset.quality,
        selected_bitrate_kbps: autoPreset.recommended_bitrate_kbps,
        fallback_reason:
          bandwidthPreset !== null
            ? `Qualidade definida automaticamente pela banda informada (${bandwidthKbps} kbps).`
            : "Sem banda informada, usando o perfil médio como padrão.",
        delivery_mode: "adaptive-auto",
        protocol: "http-progressive",
      };
    }

    /**
     * Se o cliente pediu um perfil explícito (`low`, `medium` ou `high`),
     * buscamos o preset correspondente para comparar com a banda disponível.
     */
    const requestedPreset = this.networkProfileRepository.findByQuality(requestedProfile);

    /**
     * Se a banda real suportar menos do que o perfil pedido,
     * aplicamos fallback para uma qualidade menor.
     *
     * Exemplo:
     * cliente pede `high`, mas a banda só suporta `low`.
     */
    if (bandwidthPreset && bandwidthPreset.rank < requestedPreset.rank) {
      return {
        selected_quality: bandwidthPreset.quality,
        selected_bitrate_kbps: bandwidthPreset.recommended_bitrate_kbps,
        fallback_reason:
          `Perfil ${requestedProfile} solicitado, mas a banda de ${bandwidthKbps} kbps exigiu reduzir a qualidade.`,
        delivery_mode: "adaptive-profile-with-fallback",
        protocol: "http-progressive",
      };
    }

    /**
     * Se não houve necessidade de fallback, aceitamos o perfil
     * solicitado pelo cliente como qualidade final.
     */
    return {
      selected_quality: requestedPreset.quality,
      selected_bitrate_kbps: requestedPreset.recommended_bitrate_kbps,
      fallback_reason:
        `Perfil ${requestedProfile} aceito sem necessidade de fallback adicional.`,
      delivery_mode: "adaptive-profile",
      protocol: "http-progressive",
    };
  }
}
