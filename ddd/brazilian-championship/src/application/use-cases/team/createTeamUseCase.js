import { Team } from "../../../domain/entities/team.js";
import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class CreateTeamUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const team = new Team(input);

    championship.registerTeam(team);
    this.championshipRepository.save(championship);

    return team;
  }
}
