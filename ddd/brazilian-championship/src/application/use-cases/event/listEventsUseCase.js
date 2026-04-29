import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class ListEventsUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).findMatch(matchId)
      .events;
  }
}
