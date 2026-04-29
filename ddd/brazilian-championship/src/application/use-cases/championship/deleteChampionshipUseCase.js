import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteChampionshipUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId) {
    getChampionshipOrThrow(this.championshipRepository, championshipId);
    this.championshipRepository.delete(championshipId);
  }
}
