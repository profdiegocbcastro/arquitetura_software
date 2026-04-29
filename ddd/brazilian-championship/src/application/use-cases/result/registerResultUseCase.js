import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class RegisterResultUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.registerResult({
      matchId,
      homeGoals: input.homeGoals,
      awayGoals: input.awayGoals,
    });
    this.championshipRepository.save(championship);

    return championship.findMatch(matchId);
  }
}
