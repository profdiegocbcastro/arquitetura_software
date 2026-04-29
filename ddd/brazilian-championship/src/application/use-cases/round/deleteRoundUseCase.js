import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteRoundUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, number) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.removeRound(Number(number));
    this.championshipRepository.save(championship);
  }
}
