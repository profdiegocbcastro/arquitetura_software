import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteEventUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, eventId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.findMatch(matchId).removeEvent(eventId);
    this.championshipRepository.save(championship);
  }
}
