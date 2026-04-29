import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindMatchUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).findMatch(matchId);
  }
}
