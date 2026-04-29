import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdateMatchUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const match = championship.updateMatch(matchId, input);

    this.championshipRepository.save(championship);
    return match;
  }
}
