import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindRoundUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, number) {
    return getChampionshipOrThrow(this.championshipRepository, championshipId).findRound(
      Number(number)
    );
  }
}
