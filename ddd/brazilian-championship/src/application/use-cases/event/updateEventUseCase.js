import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdateEventUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, eventId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const event = championship.findMatch(matchId).updateEvent(eventId, input);

    this.championshipRepository.save(championship);
    return event;
  }
}
