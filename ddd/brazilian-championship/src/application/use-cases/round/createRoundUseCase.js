import { Round } from "../../../domain/entities/round.js";
import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class CreateRoundUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const round = new Round(Number(input.number));

    championship.addRound(round);
    this.championshipRepository.save(championship);

    return round;
  }
}
