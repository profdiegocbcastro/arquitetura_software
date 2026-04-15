/**
 * =========================================================
 * Serviço de Feed do BFF
 * =========================================================
 */
export class VideoFeedService {
  constructor(videoFeedRepository, playbackService) {
    this.videoFeedRepository = videoFeedRepository;
    this.playbackService = playbackService;
  }

  /**
   * Lista o feed e enriquece cada card com a sessão de playback
   * calculada pelo serviço responsável pela reprodução.
   */
  async listFeed({ networkProfile, bandwidthKbps }) {
    const grpcResponse = await this.videoFeedRepository.listFeed();

    return Promise.all(
      grpcResponse.videos.map(async (grpcVideo) => {
        const recommendedPlayback = await this.playbackService.startPlayback({
          videoId: grpcVideo.id,
          networkProfile,
          bandwidthKbps,
        });

        return {
          id: grpcVideo.id,
          title: grpcVideo.title,
          creatorName: grpcVideo.creator_name,
          description: grpcVideo.description,
          durationSeconds: grpcVideo.duration_seconds,
          thumbnailUrl: grpcVideo.thumbnail_url,
          availableQualities: grpcVideo.available_qualities,
          recommendedPlayback,
        };
      })
    );
  }
}
