import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class DeletePlayerUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId, playerId) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);

    championship.findTeam(teamId).removePlayer(playerId);
    this.championshipRepository.save(championship);
  }
}
