import { NotFoundError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Serviço de Playback
 * =========================================================
 */
export class PlaybackService {
  constructor(videoFeedGateway, adaptiveDeliveryGateway, rtmpIngestUrl) {
    this.videoFeedGateway = videoFeedGateway;
    this.adaptiveDeliveryGateway = adaptiveDeliveryGateway;
    this.rtmpIngestUrl = rtmpIngestUrl;
  }

  /**
   * Resolve uma sessão de reprodução para um vídeo específico.
   */
  async startPlayback({ videoId, networkProfile, bandwidthKbps }) {
    const video = await this.videoFeedGateway.getVideoById(videoId);

    return this.buildPlaybackSession(video, {
      networkProfile,
      bandwidthKbps,
    });
  }

  /**
   * Retorna as informações de ingestão RTMP para demonstração.
   */
  getIngestInfo() {
    return {
      ingest_protocol: "rtmp",
      ingest_url: this.rtmpIngestUrl,
      stream_key_pattern: "{videoId}-{creatorSlug}",
      publish_flow:
        "Encoder/App do criador -> RTMP Ingest -> processamento offline -> variantes low/medium/high em /media",
      notes:
        "As variantes já são consideradas existentes e o playback escolhe qual servir.",
    };
  }

  async buildPlaybackSession(video, { networkProfile, bandwidthKbps }) {
    const adaptiveResponse = await this.adaptiveDeliveryGateway.resolveQuality({
      networkProfile,
      bandwidthKbps,
    });

    const selectedVariant =
      findVariant(video.available_variants, adaptiveResponse.selected_quality) ??
      findVariant(video.available_variants, "medium");

    if (!selectedVariant) {
      throw new NotFoundError(`Nenhuma variante encontrada para o vídeo ${video.id}.`);
    }

    return {
      video_id: video.id,
      selected_quality: selectedVariant.quality,
      selected_bitrate_kbps: selectedVariant.bitrate_kbps,
      stream_url: selectedVariant.stream_url,
      fallback_reason: adaptiveResponse.fallback_reason,
      protocol: adaptiveResponse.protocol,
      delivery_mode: adaptiveResponse.delivery_mode,
      available_variants: video.available_variants,
    };
  }
}

function findVariant(variants, quality) {
  return variants.find((variant) => variant.quality === quality) ?? null;
}
