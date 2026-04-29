import { randomUUID } from "node:crypto";
import { Player } from "../../../domain/entities/player.js";
import { getChampionshipOrThrow } from "../shared/championshipLookup.js";

export class CreatePlayerUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(championshipId, teamId, input) {
    const championship = getChampionshipOrThrow(this.championshipRepository, championshipId);
    const team = championship.findTeam(teamId);
    const player = new Player({ ...input, id: input.id ?? randomUUID() });

    team.addPlayer(player);
    this.championshipRepository.save(championship);

    return player;
  }
}
