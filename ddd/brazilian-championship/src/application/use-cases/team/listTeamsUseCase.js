import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class ListTeamsUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).listTeams();
  }
}
