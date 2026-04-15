import { createVideoFeedResolver } from "./videoFeedResolver.js";
import { createPlaybackResolver } from "./playbackResolver.js";
import { createServiceInfoResolver } from "./serviceInfoResolver.js";

/**
 * Função utilitária que mescla múltiplos objetos de resolvers.
 */
function mergeResolvers(...resolverObjects) {
  const merged = {};

  for (const resolvers of resolverObjects) {
    for (const [typeName, fields] of Object.entries(resolvers)) {
      merged[typeName] ??= {};
      Object.assign(merged[typeName], fields);
    }
  }

  return merged;
}

/**
 * Constrói o objeto final de resolvers.
 */
export function buildResolvers(deps) {
  return mergeResolvers(
    createServiceInfoResolver(deps),
    createVideoFeedResolver(deps),
    createPlaybackResolver(deps)
  );
}
