import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class ListPlayersUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).findTeam(teamId)
      .players;
  }
}
