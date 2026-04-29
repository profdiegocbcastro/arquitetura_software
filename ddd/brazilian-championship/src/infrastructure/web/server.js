import express from "express";
import { fileURLToPath } from "node:url";
import { BuildBrazilianChampionshipUseCase } from "../../application/use-cases/championship/buildBrazilianChampionshipUseCase.js";
import { CreateChampionshipUseCase } from "../../application/use-cases/championship/createChampionshipUseCase.js";
import { DeleteChampionshipUseCase } from "../../application/use-cases/championship/deleteChampionshipUseCase.js";
import { FindChampionshipUseCase } from "../../application/use-cases/championship/findChampionshipUseCase.js";
import { ListChampionshipsUseCase } from "../../application/use-cases/championship/listChampionshipsUseCase.js";
import { UpdateChampionshipUseCase } from "../../application/use-cases/championship/updateChampionshipUseCase.js";
import { CreateEventUseCase } from "../../application/use-cases/event/createEventUseCase.js";
import { DeleteEventUseCase } from "../../application/use-cases/event/deleteEventUseCase.js";
import { FindEventUseCase } from "../../application/use-cases/event/findEventUseCase.js";
import { ListEventsUseCase } from "../../application/use-cases/event/listEventsUseCase.js";
import { UpdateEventUseCase } from "../../application/use-cases/event/updateEventUseCase.js";
import { CreateMatchUseCase } from "../../application/use-cases/match/createMatchUseCase.js";
import { DeleteMatchUseCase } from "../../application/use-cases/match/deleteMatchUseCase.js";
import { FindMatchUseCase } from "../../application/use-cases/match/findMatchUseCase.js";
import { ListMatchesUseCase } from "../../application/use-cases/match/listMatchesUseCase.js";
import { UpdateMatchUseCase } from "../../application/use-cases/match/updateMatchUseCase.js";
import { CreatePlayerUseCase } from "../../application/use-cases/player/createPlayerUseCase.js";
import { DeletePlayerUseCase } from "../../application/use-cases/player/deletePlayerUseCase.js";
import { FindPlayerUseCase } from "../../application/use-cases/player/findPlayerUseCase.js";
import { ListPlayersUseCase } from "../../application/use-cases/player/listPlayersUseCase.js";
import { UpdatePlayerUseCase } from "../../application/use-cases/player/updatePlayerUseCase.js";
import { DeleteResultUseCase } from "../../application/use-cases/result/deleteResultUseCase.js";
import { FindResultUseCase } from "../../application/use-cases/result/findResultUseCase.js";
import { RegisterResultUseCase } from "../../application/use-cases/result/registerResultUseCase.js";
import { UpdateResultUseCase } from "../../application/use-cases/result/updateResultUseCase.js";
import { CreateRoundUseCase } from "../../application/use-cases/round/createRoundUseCase.js";
import { DeleteRoundUseCase } from "../../application/use-cases/round/deleteRoundUseCase.js";
import { FindRoundUseCase } from "../../application/use-cases/round/findRoundUseCase.js";
import { ListRoundsUseCase } from "../../application/use-cases/round/listRoundsUseCase.js";
import { UpdateRoundUseCase } from "../../application/use-cases/round/updateRoundUseCase.js";
import { FindRelegationUseCase } from "../../application/use-cases/standings/findRelegationUseCase.js";
import { FindStandingsUseCase } from "../../application/use-cases/standings/findStandingsUseCase.js";
import { CreateTeamUseCase } from "../../application/use-cases/team/createTeamUseCase.js";
import { DeleteTeamUseCase } from "../../application/use-cases/team/deleteTeamUseCase.js";
import { FindTeamUseCase } from "../../application/use-cases/team/findTeamUseCase.js";
import { ListTeamsUseCase } from "../../application/use-cases/team/listTeamsUseCase.js";
import { UpdateTeamUseCase } from "../../application/use-cases/team/updateTeamUseCase.js";
import { DomainError } from "../../domain/errors/domainError.js";
import { ChampionshipRepositoryInMemory } from "../repositories/championshipRepositoryInMemory.js";
import { ChampionshipController } from "./controllers/championshipController.js";
import { DemoController } from "./controllers/demoController.js";
import { EventController } from "./controllers/eventController.js";
import { HealthController } from "./controllers/healthController.js";
import { MatchController } from "./controllers/matchController.js";
import { PlayerController } from "./controllers/playerController.js";
import { ResultController } from "./controllers/resultController.js";
import { RoundController } from "./controllers/roundController.js";
import { StandingsController } from "./controllers/standingsController.js";
import { TeamController } from "./controllers/teamController.js";

export function createApp({ championshipRepository = new ChampionshipRepositoryInMemory() } = {}) {
  const app = express();
  const controllers = buildControllers(championshipRepository);

  app.use(express.json());

  for (const controller of controllers) {
    controller.register(app);
  }

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
  });

  app.use((error, req, res, next) => {
    if (error instanceof DomainError) {
      res.status(400).json({ error: error.message });
      return;
    }

    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON." });
      return;
    }

    next(error);
  });

  return app;
}

function buildControllers(championshipRepository) {
  return [
    new HealthController(),
    new DemoController({
      buildBrazilianChampionshipUseCase: new BuildBrazilianChampionshipUseCase(
        championshipRepository
      ),
    }),
    new ChampionshipController({
      listChampionships: new ListChampionshipsUseCase(championshipRepository),
      createChampionship: new CreateChampionshipUseCase(championshipRepository),
      findChampionship: new FindChampionshipUseCase(championshipRepository),
      updateChampionship: new UpdateChampionshipUseCase(championshipRepository),
      deleteChampionship: new DeleteChampionshipUseCase(championshipRepository),
    }),
    new TeamController({
      listTeams: new ListTeamsUseCase(championshipRepository),
      createTeam: new CreateTeamUseCase(championshipRepository),
      findTeam: new FindTeamUseCase(championshipRepository),
      updateTeam: new UpdateTeamUseCase(championshipRepository),
      deleteTeam: new DeleteTeamUseCase(championshipRepository),
    }),
    new PlayerController({
      listPlayers: new ListPlayersUseCase(championshipRepository),
      createPlayer: new CreatePlayerUseCase(championshipRepository),
      findPlayer: new FindPlayerUseCase(championshipRepository),
      updatePlayer: new UpdatePlayerUseCase(championshipRepository),
      deletePlayer: new DeletePlayerUseCase(championshipRepository),
    }),
    new RoundController({
      listRounds: new ListRoundsUseCase(championshipRepository),
      createRound: new CreateRoundUseCase(championshipRepository),
      findRound: new FindRoundUseCase(championshipRepository),
      updateRound: new UpdateRoundUseCase(championshipRepository),
      deleteRound: new DeleteRoundUseCase(championshipRepository),
    }),
    new MatchController({
      listMatches: new ListMatchesUseCase(championshipRepository),
      createMatch: new CreateMatchUseCase(championshipRepository),
      findMatch: new FindMatchUseCase(championshipRepository),
      updateMatch: new UpdateMatchUseCase(championshipRepository),
      deleteMatch: new DeleteMatchUseCase(championshipRepository),
    }),
    new ResultController({
      findResult: new FindResultUseCase(championshipRepository),
      registerResult: new RegisterResultUseCase(championshipRepository),
      updateResult: new UpdateResultUseCase(championshipRepository),
      deleteResult: new DeleteResultUseCase(championshipRepository),
    }),
    new EventController({
      listEvents: new ListEventsUseCase(championshipRepository),
      createEvent: new CreateEventUseCase(championshipRepository),
      findEvent: new FindEventUseCase(championshipRepository),
      updateEvent: new UpdateEventUseCase(championshipRepository),
      deleteEvent: new DeleteEventUseCase(championshipRepository),
    }),
    new StandingsController({
      findStandings: new FindStandingsUseCase(championshipRepository),
      findRelegation: new FindRelegationUseCase(championshipRepository),
    }),
  ];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  const app = createApp();

  app.listen(port, () => {
    console.log(`Brazilian Championship API running at http://localhost:${port}`);
  });
}
