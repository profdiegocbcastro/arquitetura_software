import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdateRoundUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, number, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const round = championship.updateRound(Number(number), input);

    this.championshipRepository.save(championship);
    return round;
  }
}
