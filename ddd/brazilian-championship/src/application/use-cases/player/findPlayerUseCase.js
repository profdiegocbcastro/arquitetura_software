import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindPlayerUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId, playerId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId)
      .findTeam(teamId)
      .findPlayer(playerId);
  }
}
