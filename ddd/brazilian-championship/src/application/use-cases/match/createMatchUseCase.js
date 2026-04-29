import { randomUUID } from "node:crypto";
import { Match } from "../../../domain/entities/match.js";
import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class CreateMatchUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, roundNumber, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const match = new Match({
      id: input.id ?? randomUUID(),
      roundNumber: Number(roundNumber),
      homeTeamId: input.homeTeamId,
      awayTeamId: input.awayTeamId,
    });

    championship.addMatch(Number(roundNumber), match);
    this.championshipRepository.save(championship);

    return match;
  }
}
