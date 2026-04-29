import { DomainError } from "../../../domain/errors/domainError.js";

export class RegisterMatchResultUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute({ championshipId, matchId, homeGoals, awayGoals }) {
    const championship = this.championshipRepository.findById(championshipId);

    if (!championship) {
      throw new DomainError(`Championship ${championshipId} not found.`);
    }

    championship.registerResult({
      matchId,
      homeGoals,
      awayGoals,
    });

    this.championshipRepository.save(championship);
    return championship.findMatch(matchId);
  }
}
