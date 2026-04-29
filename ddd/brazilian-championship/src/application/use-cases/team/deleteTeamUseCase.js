import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeleteTeamUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.removeTeam(teamId);
    this.championshipRepository.save(championship);
  }
}
