/**
 * Resolver do domínio de playback.
 */
export function createPlaybackResolver({ playbackService }) {
  return {
    Query: {
      playback: async (_, { videoId, networkProfile, bandwidthKbps }) => {
        return playbackService.startPlayback({
          videoId,
          networkProfile,
          bandwidthKbps,
        });
      },

      ingestInfo: async () => {
        return playbackService.getIngestInfo();
      },
    },
  };
}
