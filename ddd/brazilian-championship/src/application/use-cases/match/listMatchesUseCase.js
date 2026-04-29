import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class ListMatchesUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).listMatches();
  }
}
