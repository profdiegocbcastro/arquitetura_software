import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class FindRelegationUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    return {
      relegationZone: championship.relegationZone(),
      nextSeasonSerieB: championship.nextSeasonSerieB(),
    };
  }
}
