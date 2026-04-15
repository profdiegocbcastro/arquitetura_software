import { NotFoundError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Serviço de Video Feed
 * =========================================================
 */
export class VideoFeedService {
  constructor(videoCatalogRepository) {
    this.videoCatalogRepository = videoCatalogRepository;
  }

  /**
   * Lista os vídeos do feed sem decidir a reprodução.
   */
  listFeed() {
    const videos = this.videoCatalogRepository.findAll();

    return {
      videos: videos.map((video) => ({
        id: video.id,
        title: video.title,
        creator_name: video.creator_name,
        description: video.description,
        duration_seconds: video.duration_seconds,
        thumbnail_url: video.thumbnail_url,
        available_qualities: this.videoCatalogRepository.listQualities(video.id),
      })),
    };
  }

  /**
   * Retorna os detalhes completos de um vídeo.
   */
  getVideoById(videoId) {
    const video = this.videoCatalogRepository.findById(videoId);

    if (!video) {
      throw new NotFoundError(`Vídeo ${videoId} não encontrado.`);
    }

    return {
      id: video.id,
      title: video.title,
      creator_name: video.creator_name,
      description: video.description,
      duration_seconds: video.duration_seconds,
      thumbnail_url: video.thumbnail_url,
      available_qualities: this.videoCatalogRepository.listQualities(video.id),
      available_variants: this.videoCatalogRepository.listVariants(video.id),
    };
  }
}
