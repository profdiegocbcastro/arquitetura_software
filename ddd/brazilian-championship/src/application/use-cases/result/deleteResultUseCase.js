import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteResultUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, matchId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.removeResult(matchId);
    this.championshipRepository.save(championship);
  }
}
