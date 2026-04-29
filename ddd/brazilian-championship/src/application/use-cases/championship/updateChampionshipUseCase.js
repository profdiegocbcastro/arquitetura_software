import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdateChampionshipUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.update(input);
    return this.championshipRepository.save(championship);
  }
}
