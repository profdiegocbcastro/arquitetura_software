import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdateTeamUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const team = championship.updateTeam(teamId, input);

    this.championshipRepository.save(championship);
    return team;
  }
}
