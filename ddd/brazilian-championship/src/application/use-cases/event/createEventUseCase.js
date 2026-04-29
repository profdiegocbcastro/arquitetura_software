import { randomUUID } from "node:crypto";
import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class CreateEventUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const match = championship.findMatch(matchId);

    match.registerEvent({ ...input, id: input.id ?? randomUUID() });
    this.championshipRepository.save(championship);

    return match.events.at(-1);
  }
}
