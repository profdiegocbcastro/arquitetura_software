import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { VideoFeedRepository } from "./repositories/videoFeedRepository.js";
import { PlaybackRepository } from "./repositories/playbackRepository.js";
import { VideoFeedService } from "./services/videoFeedService.js";
import { PlaybackService } from "./services/playbackService.js";
import { ServiceInfoService } from "./services/serviceInfoService.js";
import { buildResolvers } from "./resolvers/index.js";

/**
 * =========================================================
 * Arquivo principal do GraphQL BFF
 * =========================================================
 *
 * Fluxo:
 *
 * HTTP -> Resolver -> Service -> Repository -> gRPC (APIs internas)
 */

/**
 * ===============================
 * 1) Carregando o schema GraphQL
 * ===============================
 */
const typeDefs = [
  readFileSync(join(process.cwd(), "src/graphql/schema.graphql"), "utf8"),
];

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const instanceName = process.env.INSTANCE_NAME ?? "graphql-bff-local";
const videoFeedGrpcTarget = process.env.VIDEO_FEED_GRPC_TARGET ?? "localhost:50053";
const playbackGrpcTarget = process.env.PLAYBACK_GRPC_TARGET ?? "localhost:50051";

const videoFeedRepository = new VideoFeedRepository(videoFeedGrpcTarget);
const playbackRepository = new PlaybackRepository(playbackGrpcTarget);
const playbackService = new PlaybackService(playbackRepository);
const videoFeedService = new VideoFeedService(videoFeedRepository, playbackService);
const serviceInfoService = new ServiceInfoService(instanceName);

/**
 * ===============================
 * 3) Definição dos resolvers
 * ===============================
 */
const resolvers = buildResolvers({
  videoFeedService,
  playbackService,
  serviceInfoService,
  instanceName,
});

/**
 * ===============================
 * 4) Schema executável
 * ===============================
 */
const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * ===============================
 * 5) Inicialização do servidor
 * ===============================
 */
async function startServer() {
  const app = express();
  const port = Number(process.env.PORT ?? 4000);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      instanceName,
    });
  });

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`[graphql-bff] ${instanceName} online em http://localhost:${port}/graphql`);
  });
}

startServer();
