/**
 * Resolver do domínio de feed.
 */
export function createVideoFeedResolver({ videoFeedService }) {
  return {
    Query: {
      videoFeed: async (_, { networkProfile, bandwidthKbps }) => {
        return videoFeedService.listFeed({
          networkProfile,
          bandwidthKbps,
        });
      },
    },
  };
}
