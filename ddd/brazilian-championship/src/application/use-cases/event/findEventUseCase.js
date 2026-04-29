import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindEventUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, eventId) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId)
      .findMatch(matchId)
      .findEvent(eventId);
  }
}
