/**
 * =========================================================
 * Repositório de catálogo de vídeos
 * =========================================================
 *
 * Neste exemplo, os metadados ficam em memória e os
 * arquivos são considerados previamente existentes em /media.
 */
export class VideoCatalogRepository {
  constructor(publicMediaBaseUrl) {
    this.publicMediaBaseUrl = publicMediaBaseUrl.replace(/\/$/, "");
    this.videos = this.createSeedCatalog();
  }

  /**
   * Lista todos os vídeos do feed.
   */
  findAll() {
    return this.videos;
  }

  /**
   * Busca um vídeo pelo identificador.
   */
  findById(videoId) {
    return this.videos.find((video) => video.id === videoId) ?? null;
  }

  /**
   * Lista apenas os nomes das qualidades disponíveis.
   */
  listQualities(videoId) {
    const video = this.findById(videoId);

    if (!video) {
      return [];
    }

    return video.variants.map((variant) => variant.quality);
  }

  /**
   * Lista todas as variantes com URL pública.
   */
  listVariants(videoId) {
    const video = this.findById(videoId);

    if (!video) {
      return [];
    }

    return video.variants;
  }

  createSeedCatalog() {
    return [
      {
        id: "video-1",
        title: "Desafio de dança no corredor",
        creator_name: "@ana.moves",
        description: "Vídeo curto com corte rápido e ritmo forte, pensado para feed vertical.",
        duration_seconds: 21,
        thumbnail_url: this.buildPublicUrl("videos/video-1/poster.jpg"),
        variants: this.createVariants("video-1"),
      },
    ];
  }

  createVariants(videoId) {
    return [
      {
        quality: "low",
        bitrate_kbps: 350,
        stream_url: this.buildPublicUrl(`videos/${videoId}/low.mp4`),
        resolution: "360x640",
      },
      {
        quality: "medium",
        bitrate_kbps: 900,
        stream_url: this.buildPublicUrl(`videos/${videoId}/medium.mp4`),
        resolution: "540x960",
      },
      {
        quality: "high",
        bitrate_kbps: 1800,
        stream_url: this.buildPublicUrl(`videos/${videoId}/high.mp4`),
        resolution: "720x1280",
      },
    ];
  }

  buildPublicUrl(relativePath) {
    return `${this.publicMediaBaseUrl}/${relativePath}`;
  }
}
