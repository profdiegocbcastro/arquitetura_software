import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindStandingsUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).standings();
  }
}
