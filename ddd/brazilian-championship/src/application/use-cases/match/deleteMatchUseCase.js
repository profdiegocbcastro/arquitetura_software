import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteMatchUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.removeMatch(matchId);
    this.championshipRepository.save(championship);
  }
}
