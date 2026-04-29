import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindResultUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).findMatch(matchId)
      .score;
  }
}
