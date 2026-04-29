import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class UpdatePlayerUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId, playerId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const player = championship.findTeam(teamId).updatePlayer(playerId, input);

    this.championshipRepository.save(championship);
    return player;
  }
}
