/**
 * =========================================================
 * Serviço de Playback do BFF
 * =========================================================
 */
export class PlaybackService {
  constructor(playbackRepository) {
    this.playbackRepository = playbackRepository;
  }

  async startPlayback({ videoId, networkProfile, bandwidthKbps }) {
    const safeVideoId = readRequiredText(videoId, "videoId");

    const grpcResponse = await this.playbackRepository.startPlayback({
      videoId: safeVideoId,
      networkProfile: toGrpcNetworkProfile(networkProfile),
      bandwidthKbps: readOptionalBandwidth(bandwidthKbps),
    });

    return toGraphQLPlaybackSession(grpcResponse);
  }

  async getIngestInfo() {
    const grpcResponse = await this.playbackRepository.getIngestInfo();
    return toGraphQLIngestInfo(grpcResponse);
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new Error(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}

function readOptionalBandwidth(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new Error("bandwidthKbps deve ser um número positivo.");
  }

  return Math.trunc(numericValue);
}

function toGrpcNetworkProfile(networkProfile) {
  return (networkProfile ?? "AUTO").toLowerCase();
}

export function toGraphQLPlaybackSession(grpcSession) {
  return {
    videoId: grpcSession.video_id,
    selectedQuality: grpcSession.selected_quality,
    selectedBitrateKbps: grpcSession.selected_bitrate_kbps,
    streamUrl: grpcSession.stream_url,
    fallbackReason: grpcSession.fallback_reason,
    protocol: grpcSession.protocol,
    deliveryMode: grpcSession.delivery_mode,
    availableVariants: grpcSession.available_variants.map((variant) => ({
      quality: variant.quality,
      bitrateKbps: variant.bitrate_kbps,
      streamUrl: variant.stream_url,
      resolution: variant.resolution,
    })),
  };
}

function toGraphQLIngestInfo(grpcIngestInfo) {
  return {
    ingestProtocol: grpcIngestInfo.ingest_protocol,
    ingestUrl: grpcIngestInfo.ingest_url,
    streamKeyPattern: grpcIngestInfo.stream_key_pattern,
    publishFlow: grpcIngestInfo.publish_flow,
    notes: grpcIngestInfo.notes,
  };
}
